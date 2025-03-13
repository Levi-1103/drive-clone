"use client"

import { createFile } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { env } from "@/env/client"
import { Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

export default function UploadFileButton(props: { parentId: number, ownerId: string }) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const baseUrl = env.NEXT_PUBLIC_BASE_URL;

    const handleUpload = async () => {
        if (!file) {
            return
        }
        setIsUploading(true)

        try {
            const response = await fetch(
                baseUrl + '/api/files/upload',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filename: file.name, contentType: file.type }),
                }
            )

            console.log(response)


            if (!response.ok) {
                throw new Error("Failed to get pre-signed URL");
            }

            const { url, fields } = await response.json()
            const formData = new FormData()
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string)
            })
            formData.append('file', file)

            // for (const pair of formData.entries()) {
            //     console.log(pair[0], pair[1]);
            // }

            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            })

            if (!uploadResponse.ok) {
                throw new Error("Failed to get pre-signed URL");
            }

            toast.success("Upload successful", {
                description: `${file.name} has been uploaded.`,
            })
            setFile(null)
            setOpen(false)

            createFile(file.name, props.ownerId, props.parentId, file.size, fields.key)

        } catch (error) {
            console.log(error)
            toast.error("Upload failed", {
                description: "There was an error uploading your file. Please try again.",
            })
        }
        finally {
            setIsUploading(false)
            router.refresh()
        }

    }

    const clearFile = () => {
        setFile(null)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload file</DialogTitle>
                    <DialogDescription>Upload a file from your computer</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="file">File</Label>
                        <div className="flex items-center gap-2">
                            <Input accept=".jpg,.png,.pdf" id="file" type="file" onChange={handleFileChange} className="flex-1" />
                            {file && (
                                <Button variant="ghost" size="icon" onClick={clearFile} aria-label="Clear file selection">
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleUpload} disabled={!file || isUploading}>
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}