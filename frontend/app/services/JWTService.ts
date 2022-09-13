import type { SessionStorage } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import jwtDecode from 'jwt-decode';
import {
  ACCESS_TOKEN_HEADER_NAME,
  LOGOUT_REDIRECT_PATH,
  SESSION_USER_DATA_NAME,
  TOKEN_EXPIRES_IN_TO_REFRESH_DIVISOR,
} from './constants';
import type { TRefreshAccessTokenReturn, THeaders } from './types';

export type TJWTServiceParams = {
  sessionStorage: SessionStorage;
  baseUrl: string;
};

/**
 * Сервис по работе с JWT
 */
export class JWTService {
  private sessionStorage: SessionStorage;
  private readonly baseUrl: string;

  constructor({ sessionStorage, baseUrl }: TJWTServiceParams) {
    this.sessionStorage = sessionStorage;
    this.baseUrl = baseUrl;
  }

  private async getTokenSetHeaders(request: Request, accessToken: string): Promise<THeaders> {
    const session = await this.sessionStorage.getSession(request.headers.get('Cookie'));
    const userData = session.get(SESSION_USER_DATA_NAME);

    session.set(SESSION_USER_DATA_NAME, { ...userData, accessToken: accessToken });

    return {
      'Set-Cookie': await this.sessionStorage.commitSession(session),
    };
  }

  private async getTokenRemoveHeaders(request: Request): Promise<THeaders> {
    const session = await this.sessionStorage.getSession(request.headers.get('Cookie'));

    return {
      'Set-Cookie': await this.sessionStorage.destroySession(session),
    };
  }

  public setAccessToken(request: Request, accessToken: string): void {
    request.headers.set(ACCESS_TOKEN_HEADER_NAME, accessToken);
  }

  async getAccessToken(request: Request) {
    const customAccessToken = request.headers.get(ACCESS_TOKEN_HEADER_NAME);

    if (customAccessToken) {
      return customAccessToken;
    }

    const { accessToken } = await this.getSessionData(request);
    if (!accessToken) {
      throw await this.logout(request);
    }
    return accessToken;
  }

  async refreshAccessToken(request: Request): Promise<TRefreshAccessTokenReturn> {
    const url = '/auth/realms/pb2/protocol/openid-connect/token';
    const { refreshToken } = (await this.getSessionData(request)) ?? {};

    if (!refreshToken) {
      throw await this.logout(request);
    }

    const params = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    let response: Response;

    try {
      response = await fetch(this.baseUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(params),
      });
    } catch (error) {
      throw error;
    }

    if (!response.ok) {
      const errorMsg = response.text();
      throw await this.logout(request);
    }

    let accessToken: string;

    try {
      const { access_token: responseAccessToken } = await response.json();
      accessToken = responseAccessToken;
    } catch (error) {
      throw error;
    }

    if (!accessToken) {
      throw await this.logout(request);
    }

    const headers = await this.getTokenSetHeaders(request, accessToken);

    return { accessToken, headers };
  }

  async checkIfNeedToRefreshToken(request: Request): Promise<boolean> {
    const { accessToken, expiresIn } = (await this.getSessionData(request)) ?? {};

    if (!accessToken || !expiresIn) {
      return true;
    }

    const decodedToken = jwtDecode(accessToken) as { exp: number };
    const remainedTime = decodedToken.exp - new Date().getTime() / 1000;
    const timeToRefresh = expiresIn / TOKEN_EXPIRES_IN_TO_REFRESH_DIVISOR;

    return remainedTime < timeToRefresh;
  }

  async logout(request: Request) {
    const headers = await this.getTokenRemoveHeaders(request);

    throw redirect(LOGOUT_REDIRECT_PATH, {
      headers,
    });
  }

  private async getSessionData(request: Request) {
    const session = await this.sessionStorage.getSession(request.headers.get('Cookie'));

    return session.get(SESSION_USER_DATA_NAME);
  }
}
