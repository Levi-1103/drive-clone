"use client"

import { createFolder } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';


import { useState } from "react";


export default function CreateFolderButton(props: { parentId: number, ownerId: string }) {

    const [folderName, setFolderName] = useState("")
    const [open, setOpen] = useState(false)
    const router = useRouter()



    const handleCreateFolder = () => {
        if (folderName.trim() === "") return
        createFolder(folderName, props.ownerId, props.parentId)
        setFolderName("")
        setOpen(false)
        router.refresh()

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Folder</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                </DialogHeader>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        id="name"
                        placeholder="Folder Name"
                        className="col-span-3"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && folderName.trim() !== "") {
                                handleCreateFolder()
                            }
                        }}
                    />
                    <Button onClick={handleCreateFolder} disabled={folderName.trim() === ""}>
                        Create Folder
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    )
}