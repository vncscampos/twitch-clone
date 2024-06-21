import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher(["/"])
const clerkWebHooks = createRouteMatcher(["/api/webhooks(.*)"]);
const uploadthingWebhooks = createRouteMatcher(["/api/uploadthing(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (clerkWebHooks(req)) return NextResponse.next();
  if (publicRoutes(req)) return NextResponse.next();
  if (uploadthingWebhooks(req)) return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
