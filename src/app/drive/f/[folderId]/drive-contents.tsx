"use client";

import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "@/db/schema";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { auth } from "@/auth";


export default function DriveContents(props: {
    files: typeof files_table.$inferSelect[],
    folders: typeof folders_table.$inferSelect[],
    parents: typeof folders_table.$inferSelect[],
},) {


    const handleUpload = () => {
        alert("Upload functionality would be implemented here")
    }

    return (



        <div className="bg-gray-800 rounded-lg shadow-xl">
            <div className="px-6 py-4 ">
                <div className="grid grid-cols-15 gap-4 text-sm font-medium text-gray-400">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-3">Type</div>
                    <div className="col-span-3">Size</div>
                    <div className="col-span-3">Created At</div>
                </div>
            </div>
            <ul>

                {props.folders.map((folder) => (
                    <FolderRow key={folder.id} folder={folder} handleFolderClick={() => {

                    }} />
                ))}

                {props.folders.length === 0 && <div className="p-10 justify-self-center">Empty Folder</div>}

                {props.files.map((file) => (
                    <FileRow key={file.id} file={file} />
                ))}
            </ul>


        </div>
    )
}

