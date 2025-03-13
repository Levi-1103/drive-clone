"use client";

import { Download, FileIcon, Folder as FolderIcon } from "lucide-react";
import type { files_table, folders_table } from "@/db/schema";
import Link from "next/link";
import DownloadFile from "./download-file";
import DeleteFile from "./delete-file";

export function FileRow(props: { file: typeof files_table.$inferSelect, ownerId: string }) {
    const { file, ownerId } = props;
    return (
        <li key={file.id} className="px-6 py-4 border-t border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-18 gap-4 items-center">
                <div className="col-span-6 flex items-center">

                    <a href={file.url} target="_blank" className="flex items-center text-primary hover:text-blue-400 break-all">
                        <FileIcon className="mr-3" size={20} />
                        {file.name}
                    </a>

                </div>
                {/* temp solution for file type display */}
                <div className="col-span-3 text-gray-400">{file.name.slice(-4)}</div>
                <div className="col-span-3 text-gray-400">{file.size}</div>
                <div className="col-span-4 text-gray-400">{file.createdAt.toUTCString()}</div>
                <DownloadFile ownerId={ownerId} fileName={file.name} />
                <DeleteFile ownerId={ownerId} fileName={file.name} />

            </div>
        </li>
    );
}

export function FolderRow(props: { folder: typeof folders_table.$inferSelect, handleFolderClick: () => void; }) {
    const { folder } = props;
    return (
        <li key={folder.id} className="px-6 py-4 border-t border-gray-700 hover:bg-gray-750">
            <div className="grid grid-cols-18 gap-4 items-center">
                <div className="col-span-6 flex items-center">
                    <Link
                        href={`/drive/f/${folder.id}`}
                        className="flex items-center text-gray-100 hover:text-blue-400"                  >
                        <FolderIcon className="mr-3" size={20} />
                        {folder.name}
                    </Link>
                </div>
                <div className="col-span-3 text-gray-400"></div>
                <div className="col-span-3 text-gray-400"></div>
                <div className="col-span-4 text-gray-400">{folder.createdAt.toUTCString()}</div>

            </div>
        </li>
    );
}