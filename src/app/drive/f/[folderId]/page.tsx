import db from "@/db";
import { files_table, folders_table } from "@/db/schema";
import { eq } from "drizzle-orm";
import DriveMain from "./drive-main";



async function getAllParents(folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
        const folder = await db.selectDistinct().from(folders_table).where(eq(folders_table.id, currentId));

        if (!folder[0]) {
            throw new Error("Parent folder not found")
        }
        parents.unshift(folder[0]);
        currentId = folder[0]?.parent_id;
    }
    return parents;
}

export default async function DriveClone(props: {
    params: Promise<{ folderId: string }>;
}) {
    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    const filesPromise = db.select().from(files_table).where(eq(files_table.parent_id, parsedFolderId));
    const foldersPromise = db.select().from(folders_table).where(eq(folders_table.parent_id, parsedFolderId));
    const parentsPromise = getAllParents(parsedFolderId);

    const [folders, files, parents] = await Promise.all([foldersPromise, filesPromise, parentsPromise])

    return (

        <div>
            <DriveMain files={files} folders={folders} parents={parents} />

        </div>


    );
}

