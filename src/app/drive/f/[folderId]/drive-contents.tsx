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
                        {props.parents.map((folder, index) => (
                            <div key={folder.id} className="flex items-center">
                                <ChevronRight className="mx-2 text-gray-500" size={16} />
                                <Link
                                    href={`/drive/f/${folder.id}`}
                                    className="text-gray-300 hover:text-white"
                                >
                                    {folder.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Button onClick={handleUpload}>
                        <Upload className="mr-2" size={20} />
                        Upload
                    </Button>

                    <Avatar>
                        <AvatarImage src={""} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>




                </div>
                <div className="bg-gray-800 rounded-lg shadow-xl">
                    <div className="px-6 py-4 border-b border-gray-700">
                        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
                            <div className="col-span-6">Name</div>
                            <div className="col-span-3">Type</div>
                            <div className="col-span-3">Size</div>
                        </div>
                    </div>
                    <ul>

                        {props.folders.map((folder) => (
                            <FolderRow key={folder.id} folder={folder} handleFolderClick={() => {

                            }} />
                        ))}

                        {props.files.map((file) => (
                            <FileRow key={file.id} file={file} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

