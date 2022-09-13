import type { SessionStorage } from '@remix-run/node';
import { createCookieSessionStorage } from '@remix-run/node';

export class ServerSession {
  static storage: SessionStorage = createCookieSessionStorage();

  static init(...args: Parameters<typeof createCookieSessionStorage>): void {
    ServerSession.storage = createCookieSessionStorage(...args);
  }
}
