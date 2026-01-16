import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const roleCookie = request.cookies.get("role");
  const url = request.nextUrl.clone();

  const loggedOutRoutes = ["/login", "/signup"];
  if (!authCookie || !roleCookie) {
    if (!loggedOutRoutes.includes(url.pathname)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (authCookie && roleCookie && url.pathname === "/login") {
    url.pathname = "/home"; 
    return NextResponse.redirect(url);
  }

  const adminRoutes = ["/home/users", "/home/teams"];

  if (adminRoutes.includes(url.pathname) && roleCookie && roleCookie.value !== "admin") {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
