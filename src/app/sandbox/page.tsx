import { Button } from "@/components/ui/button";

import db from "@/db";
import { files_table, folders_table } from "@/db/schema";
import { mockFiles, mockFolders } from "@/lib/mockdata";

export default function SandboxPage() {
    return (
        <div className="flex flex-col gap-4">
            <form action={async () => {
                "use server";

                console.log("awooga")
                // await db.insert(folders_table).values(
                //     mockFolders.map((folder, index) => ({
                //         ownerId: index,
                //         parent_id: index !== 0 ? 1 : null,
                //         name: folder.name,
                //     }));
                // );

                // await db.insert(folders_table).values(
                //     {
                //         name: "hello",
                //         owner_id: "dasdsad",
                //         parent_id: 3,
                //     }
                // )

                const folderInsert = await db.insert(folders_table).values(
                    mockFolders.map((folder, index) => ({
                        name: folder.name,
                        owner_id: "user1",
                        parent_id: index !== 0 ? 1 : null,
                    }))
                )

                const fileInsert = await db.insert(files_table).values(
                    mockFiles.map((file, index) => ({
                        name: file.name,
                        owner_id: "user1",
                        parent_id: (index % 3) + 1,
                        size: 534534,
                        url: file.url,
                    }))
                )

                console.log(folderInsert, fileInsert)
            }}>
                <Button type="submit">SEED</Button>
            </form>
        </div >
    );
}

