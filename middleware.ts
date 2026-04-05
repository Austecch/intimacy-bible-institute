import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn = request.cookies.get("auth_token");
  const userRole = request.cookies.get("user_role");
  
  // Demo mode bypass (remove in production)
  const isDemoAdmin = request.nextUrl.searchParams.get("demo") === "admin";

  const publicRoutes = ["/", "/login", "/register", "/about", "/programs", "/media", "/testimonials", "/contact", "/admissions"];
  const studentRoutes = ["/dashboard"];
  const adminRoutes = ["/admin"];

  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));
  const isStudentRoute = studentRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Demo admin access
  if (isAdminRoute && isDemoAdmin) {
    return NextResponse.next();
  }

  if (isStudentRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && userRole?.value !== "admin") {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
