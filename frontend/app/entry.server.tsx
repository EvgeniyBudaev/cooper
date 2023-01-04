import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

function getContentSecurityPolicy(nonce?: string) {
  let script_src: string;
  if (typeof nonce === "string" && nonce.length > 40) {
    script_src = `'self' 'nonce-${nonce}'`;
  } else if (process.env.NODE_ENV === "development") {
    // Allow the <LiveReload /> component to load without a nonce in the error pages
    script_src = "'self' ''unsafe-inline'";
  } else {
    script_src = "'self'";
  }

  const connect_src =
    process.env.NODE_ENV === "development"
      ? "'self' ws://localhost:*"
      : "'self'";

  return (
    "default-src 'self'; " +
    `script-src ${script_src}; ` +
    `style-src 'self' https: 'unsafe-inline'; ` +
    "base-uri 'self'; " +
    'block-all-mixed-content; ' +
    "child-src 'self'; " +
    `connect-src ${connect_src}; ` +
    "img-src 'self' data:; " +
    "font-src 'self' https: data:; " +
    "form-action 'self'; " +
    "frame-ancestors 'self'; " +
    "frame-src 'self'; " +
    "manifest-src 'self'; " +
    "media-src 'self'; " +
    "object-src 'none'; " +
    "prefetch-src 'self'; " +
    "script-src-attr 'none';" +
    "worker-src 'self' blob:; " +
    'upgrade-insecure-requests'
  );
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const nonce: string | undefined =
    remixContext.appState.catchBoundaryRouteId === "root" &&
      remixContext.appState.error
        ? undefined
        : remixContext.routeData.root?.cspScriptNonce;

  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("Content-Security-Policy", getContentSecurityPolicy(nonce));

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
