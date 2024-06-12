import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);
const clerkWebHooks = createRouteMatcher(["/api/webhooks(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (clerkWebHooks(req)) return NextResponse.next();
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
