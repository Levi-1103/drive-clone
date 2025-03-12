"use client"

import { createFolder } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Router } from "next/router";

import { useState } from "react";


export default function CreateFolderButton(props: { parentId: number, ownerId: string }) {

    const [folderName, setFolderName] = useState("")

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Folder</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                </DialogHeader>

                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input id="name" placeholder="Folder Name" className="col-span-3" value={folderName} onChange={(e) => setFolderName(e.target.value)} />
                    <DialogClose asChild>
                        <Button onClick={() => createFolder(folderName, props.ownerId, props.parentId)}>
                            Create Folder
                        </Button>
                    </DialogClose>

                </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}