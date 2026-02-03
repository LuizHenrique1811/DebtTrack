import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * O objeto retornado pelo hook useSession, auth(), etc.
   */
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * O token JWT retornado pelo callback jwt
   */
  interface JWT {
    id: string
  }
}