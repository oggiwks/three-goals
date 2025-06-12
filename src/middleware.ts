import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { ipAddress } from "@vercel/edge";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export const middleware = async (
  request: NextRequest,
): Promise<NextResponse> => {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.ENVIRONMENT !== "local"
  ) {
    const ip = ipAddress(request) || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: {
          "Retry-After": "10",
        },
      });
    }
  }

  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value;
    if (token) {
      // Only extend cookie expiration on GET requests since we can be sure
      // a new session wasn't set when handling the request.
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return response;
  }

  const originHeader =
    request.headers.get("Origin") || request.headers.get("X-Forwarded-Host");
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("Host");
  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  let origin: URL;
  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403,
    });
  }
  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
};
