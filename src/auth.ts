import GitHub from "next-auth/providers/github"
import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/schema"


export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitHub],
})
