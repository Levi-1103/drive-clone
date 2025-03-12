import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

import db from "@/db";
import { files_table, folders_table } from "@/db/schema";
import { mockFiles, mockFolders } from "@/lib/mockdata";
import { redirect } from "next/navigation";


export default async function SandboxPage() {

    const session = await auth();

    return (
        <div className="flex flex-col gap-4">




            <form action={async () => {
                "use server";



                if (!session?.user?.id) {
                    throw new Error("owner_id cannot be null");
                }

                const fileInsert = await db.insert(files_table).values(
                    {
                        name: "filename",
                        owner_id: session.user.id,
                        parent_id: 1,
                        size: 1000,
                        url: "file.url",
                    })


                console.log(fileInsert)
            }}>
                <Button type="submit">Add File</Button>
            </form>

            <form action={async () => {
                "use server";

                if (!session?.user?.id) {
                    throw new Error("owner_id cannot be null");
                }

                const folderInsert = await db.insert(folders_table).values(
                    {
                        name: "root",
                        owner_id: "session.user.id",
                        parent_id: null,
                    }
                ).returning({ insertedId: folders_table.id });

                console.log(folderInsert)

                const rootFolderId = folderInsert[0].insertedId;


                redirect(`/drive/f/${rootFolderId}`);






            }}>
                <Button type="submit">Add Folder</Button>
            </form>
        </div >
    );
}

