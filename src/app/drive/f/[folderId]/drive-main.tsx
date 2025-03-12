import { auth, signOut } from "@/auth";
import { SignOut } from "@/components/sign-in";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { files_table, folders_table } from "@/db/schema"
import requireAuth from "@/utils/require-auth";

import { ChevronRight, Upload } from "lucide-react"
import Link from "next/link";

export default async function DriveMain(props: {
    files: typeof files_table.$inferSelect[],
    folders: typeof folders_table.$inferSelect[],
    parents: typeof folders_table.$inferSelect[],
},) {

    await requireAuth();
    const session = await auth();


    const handleUpload = () => {
        alert("Upload functionality would be implemented here")
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Link
                            href={"/drive/f/1"}

                            className=" hover:text-white mr-2"
                        >
                            My Drive
                        </Link>
                        {/* {props.parents.map((folder, index) => (
                            <div key={folder.id} className="flex items-center">
                                <ChevronRight className="mx-2 text-gray-500" size={16} />
                                <Link
                                    href={`/drive/f/${folder.id}`}
                                    className="text-gray-300 hover:text-white"
                                >
                                    {folder.name}
                                </Link>
                            </div>
                        ))} */}
                    </div>
                    <Button >
                        <Upload className="mr-2" size={20} />
                        Upload
                    </Button>



                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className="w-10 h-10 hover:opacity-75">
                            <Avatar className="">
                                <AvatarImage src={session?.user?.image!} />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Hi, {session?.user?.name!}!</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={async () => {
                                "use server"
                                await signOut()
                            }}>
                                Log Out

                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>



                </div>

            </div>
        </div>
    )
}

