"use client"

import { Button } from "@/components/ui/button";
import { Download, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteFile(props: { ownerId: string, fileUrl: string }) {
    const router = useRouter()

    const handleDelete = async () => {

        const fileKey = props.fileUrl

        console.log(fileKey)
        try {
            const queryParams = new URLSearchParams({
                key: fileKey,
            })
            const response = await fetch('http://localhost:3000/api/files/delete?' + queryParams, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error("Failed to Delete File");
            }


        } catch (error) {
            toast.error("Delete Failed", {
                description: "There was an error deleting your file. Please try again.",
            })
        }
        finally {
            // setIsUploading(false)
            router.refresh()
        }
    }
    return (
        <Button onClick={handleDelete} variant="outline" size="icon">
            <Trash />
        </Button>
    );
}