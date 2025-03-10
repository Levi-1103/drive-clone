import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function requireAuth() {
    const session = await auth()
    if (!session?.user) {
        redirect("/");
    }
}