import { NextResponse, NextRequest } from "next/server";

// Middleware guarding /feature. Updated to use the real auth cookie and drop the hardcoded value check.
export async function proxy(request: NextRequest) {
  // const cookies = request.cookies;
  // if(!cookies.has("IPM_AT")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  const token = request.cookies.get("IPM_AT")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};

