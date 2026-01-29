import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { AuthService } from "@/core/services/auth.service";

export const {
    auth,
    signIn,
    signOut,
    handlers,
  } = NextAuth({
    adapter: PrismaAdapter(prisma),
  
    session: {
      strategy: "database",
    },
  
    providers: [
      Credentials({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
  
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
  
          const user = await AuthService.validateCredentials(
            credentials.email,
            credentials.password
          );
  
          return user;
        },
      }),
    ],
  
    callbacks: {
      async session({ session, user }) {
        // garante acesso ao user.id
        if (session.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
  });
  
