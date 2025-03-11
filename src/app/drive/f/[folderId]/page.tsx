import db from "@/db";
import { files_table, folders_table } from "@/db/schema";
import DriveContents from "./drive-contents";


export default async function DriveClone(props: {
    params: Promise<{ folderId: string }>;
}) {
    const files = await db.select().from(files_table);
    const folders = await db.select().from(folders_table);

    return (
        <DriveContents files={files} folders={folders} />
    );
}

