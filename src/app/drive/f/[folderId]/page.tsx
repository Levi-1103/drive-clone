import db from "@/db";
import { files_table, folders_table } from "@/db/schema";
import DriveContents from "./drive-contents";
import { z } from "zod";
import { eq } from "drizzle-orm";


export default async function DriveClone(props: {
    params: Promise<{ folderId: string }>;
}) {

    const params = await props.params;


    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }



    const files = await db.select().from(files_table).where(eq(files_table.parent_id, parsedFolderId));;
    const folders = await db.select().from(folders_table).where(eq(folders_table.parent_id, parsedFolderId));

    return (
        <DriveContents files={files} folders={folders} />
    );
}

