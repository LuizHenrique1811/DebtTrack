import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// Inicializa a autenticação usando APENAS o arquivo leve
const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    
    // O NextAuth injeta a sessão no 'req.auth' automaticamente
    const isLoggedIn = !!req.auth;

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};