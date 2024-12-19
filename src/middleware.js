import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const publicroutes = ["/", "/listing", "/contact", "/blogs", "/testimonials"];

// Dynamic routes pattern: matches `/listing/:id` and similar
const dynamicPublicRoutes = [/^\/listing\/\d+$/];

export const authroutes = ["/sign-in", "/signup"];

const apiAuthPrefix = "/api/auth";

const DEFAULT_LOGIN_REDIRECT = "/intime-admin";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Check if the route is a public route
  const isPublicRoute =
    publicroutes.includes(nextUrl.pathname) ||
    dynamicPublicRoutes.some((pattern) => pattern.test(nextUrl.pathname));

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authroutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/(api|trpc)(.*)",
    "/",
    "/blogs",
    "/contact",
    "/testimonials",
    "/listing",
    "/listing/:path*",
    "/intime-admin/:path*",
    "/login",
    "/signup",
  ],
};
