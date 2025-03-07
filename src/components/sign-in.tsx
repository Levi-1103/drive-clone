import { signIn, signOut } from "@/auth"
import { Button } from "./ui/button"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("github")
            }}
        >
            <Button type="submit">Signin with GitHub</Button>
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
