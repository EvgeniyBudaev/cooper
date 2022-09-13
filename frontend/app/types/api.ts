import type { SessionStorage } from '@remix-run/node';

export type TApiConfig = {
  basePath: string;
  sessionStorage: SessionStorage;
  timeout: number;
  retry: number;
};

export type TApiOptions = Omit<RequestInit, 'body'> & { body?: any; retry?: number };

export type TApiFunction = <T extends unknown>(
  request: Request,
  path: string,
  options?: TApiOptions,
) => Promise<T>;