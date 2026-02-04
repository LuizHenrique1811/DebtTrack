import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
    const { nextUrl } = req;
    const session = await auth();

    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
    }

    export const config = {
    matcher: ["/", "/dashboard/:path*"],
};
