import { auth } from "@/auth";
import SignIn, { SignOut } from "@/components/sign-in";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import requireAuth from "@/utils/require-auth";

export default async function Dashboard() {

    await requireAuth();


    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="flex gap-4 items-center flex-col">
                    <h1>This is a protected dashboard</h1>
                    <SignOut />

                    {/* <Avatar>
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    <h1>{session.user.name}</h1>
                    <h1>{session.user.id}</h1> */}

                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
