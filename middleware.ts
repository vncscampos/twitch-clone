import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const publicRoutes = createRouteMatcher([
    "/",
    "/:username",
    "/api/webhooks(.*)",
    "/api/uploadthing(.*)",
]);

export default clerkMiddleware((auth, req) => {
    if (publicRoutes(req)) return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
