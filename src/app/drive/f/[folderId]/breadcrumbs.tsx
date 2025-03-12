"use client";

import { folders_table } from "@/db/schema";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Breadcrumbs(props: { parents: typeof folders_table.$inferSelect[] }) {
    return (
        <>
            {props.parents.slice(1).map((folder, index) => (
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
        </>
    );
}