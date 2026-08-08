const DIAGNOSTIC_ORIGIN = "https://haleverse-radar-webhook.humartinez20.chatgpt.site";
const PROXY_PREFIX = "/diagnostico-proxy";

function upstreamRequest(request, pathname) {
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(pathname + incomingUrl.search, DIAGNOSTIC_ORIGIN);
  const headers = new Headers(request.headers);

  headers.set("Origin", DIAGNOSTIC_ORIGIN);
  headers.set("Referer", `${DIAGNOSTIC_ORIGIN}/diagnostico`);
  headers.delete("Host");

  return new Request(upstreamUrl, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
  });
}

function publicResponse(upstreamResponse, body = upstreamResponse.body) {
  const headers = new Headers(upstreamResponse.headers);
  headers.delete("content-length");
  headers.delete("set-cookie");
  headers.set("X-Robots-Tag", "index, follow");

  return new Response(body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

async function proxyDiagnostic(request) {
  const incomingUrl = new URL(request.url);
  let upstreamPath = incomingUrl.pathname;

  if (upstreamPath === "/diagnostico/") upstreamPath = "/diagnostico";
  if (upstreamPath.startsWith(`${PROXY_PREFIX}/`)) {
    upstreamPath = upstreamPath.slice(PROXY_PREFIX.length);
  }

  const upstreamResponse = await fetch(upstreamRequest(request, upstreamPath));
  const contentType = upstreamResponse.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return publicResponse(upstreamResponse);
  }

  const html = await upstreamResponse.text();
  const rewrittenHtml = html
    .replaceAll('"/assets/', `"${PROXY_PREFIX}/assets/`)
    .replaceAll("'/assets/", `'${PROXY_PREFIX}/assets/`)
    .replaceAll('"/haleverse-logo.svg"', `"${PROXY_PREFIX}/haleverse-logo.svg"`)
    .replaceAll(`${DIAGNOSTIC_ORIGIN}/diagnostico`, "https://haleverse.com/diagnostico/");

  return publicResponse(upstreamResponse, rewrittenHtml);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (
      pathname === "/diagnostico" ||
      pathname === "/diagnostico/" ||
      pathname.startsWith(`${PROXY_PREFIX}/`) ||
      pathname.startsWith("/api/diagnostic/")
    ) {
      return proxyDiagnostic(request);
    }

    return env.ASSETS.fetch(request);
  },
};
