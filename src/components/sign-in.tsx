import { signIn, signOut } from "@/auth"
import { Button } from "./ui/button"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn()
                // await signIn("github", { redirectTo: "/dashboard" })
            }}
        >
            <Button type="submit">Sign In</Button>
        </form>
    )
}


export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <Button type="submit">Sign Out</Button>
        </form>
    )
}
