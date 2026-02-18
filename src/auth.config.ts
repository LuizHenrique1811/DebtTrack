import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    
    providers: [],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token,user }){
            if(user && typeof user.id === "string"){
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token}) {
            if (session.user && typeof token.id == "string") {
                session.user.id = token.id
            }
            return session;
        },
    },
} satisfies NextAuthConfig;