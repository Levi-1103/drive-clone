import GitHub from "next-auth/providers/github"
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/schema"
import { env } from "./env/server"


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        GitHub({
            clientId: env.AUTH_GITHUB_ID, clientSecret: env.AUTH_GITHUB_SECRET
        })
    ],


})
