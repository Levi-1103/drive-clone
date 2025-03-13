"use client"

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import router from "next/router";
import { toast } from "sonner";

export default function DownloadFile(props: { ownerId: string, fileUrl: string }) {

    const handleDownload = async () => {

        const fileKey = props.fileUrl

        console.log(fileKey)
        try {

            const queryParams = new URLSearchParams({
                key: fileKey,
            })
            const response = await fetch('http://localhost:3000/api/files/download?' + queryParams)
            const download_url = await response.json();

            window.open(download_url, '_blank')
            if (!response.ok) {
                throw new Error("Failed to get pre-signed URL");
            }

        } catch (error) {
            toast.error("Download failed", {
                description: "There was an error downloading your file. Please try again.",
            })
        }
        finally {
            // setIsUploading(false)
            // router.refresh()
        }
    }
    return (
        <Button onClick={handleDownload} variant="outline" size="icon">
            <Download />
        </Button>
    );
}