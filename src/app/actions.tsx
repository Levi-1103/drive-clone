'use server'

import db from "@/db"
import { files_table, folders_table } from "@/db/schema"
import { and, eq } from "drizzle-orm"


export async function createFolder(folderName: string, ownerId: string, parentId: number) {

    return await db.insert(folders_table).values(
        {
            name: folderName,
            owner_id: ownerId,
            parent_id: parentId,
        }
    )
}

export async function createFile(fileName: string, ownerId: string, parentId: number, file_size: number, file_url: string) {

    return await db.insert(files_table).values(
        {
            name: fileName,
            owner_id: ownerId,
            parent_id: parentId,
            size: file_size,
            url: file_url,
        })
}

export async function deleteFile(fileUrl: string, ownerId: string) {

    return await db.delete(files_table).where(
        and(
            eq(files_table.url, fileUrl),
            eq(files_table.owner_id, ownerId)
        )
    );
}