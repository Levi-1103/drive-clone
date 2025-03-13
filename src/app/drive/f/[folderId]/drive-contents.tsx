"use client";

import type { files_table, folders_table } from "@/db/schema";
import { FileRow, FolderRow } from "./file-row";


export default function DriveContents(props: {
    files: typeof files_table.$inferSelect[],
    folders: typeof folders_table.$inferSelect[],
    parents: typeof folders_table.$inferSelect[],
    ownerId: string
},) {

    return (



        <div className="bg-gray-800 rounded-lg shadow-xl">
            <div className="px-6 py-4 ">
                <div className="grid grid-cols-18 gap-4 text-sm font-medium text-gray-400">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-3">Type</div>
                    <div className="col-span-3">Size</div>
                    <div className="col-span-4">Created At</div>
                </div>
            </div>
            <ul>

                {props.folders.map((folder) => (
                    <FolderRow key={folder.id} folder={folder} handleFolderClick={() => {

                    }} />
                ))}

                {props.folders.length === 0 && props.files.length === 0 && <div className="p-10 justify-self-center">Empty Folder</div>}

                {props.files.map((file) => (
                    <FileRow key={file.id} file={file} ownerId={props.ownerId} />
                ))}
            </ul>


        </div>
    )
}

