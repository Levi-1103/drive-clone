'use server'

import db from "@/db"
import { folders_table } from "@/db/schema"


export async function createFolder(folderName: string, ownerId: string, parentId: number) {

    return await db.insert(folders_table).values(
        {
            name: folderName,
            owner_id: ownerId,
            parent_id: parentId,
        }
    )
}