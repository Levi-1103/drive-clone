"use client"

import { Button } from "@/components/ui/button";
import { env } from "@/env/client";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function DownloadFile(props: { ownerId: string, fileUrl: string }) {

    const handleDownload = async () => {

        const fileKey = props.fileUrl

        const baseUrl = env.NEXT_PUBLIC_BASE_URL;

        console.log(fileKey)
        try {

            const queryParams = new URLSearchParams({
                key: fileKey,
            })
            const response = await fetch(baseUrl + '/api/files/download?' + queryParams)
            const download_url = await response.json();

            window.open(download_url, '_blank')
            if (!response.ok) {
                throw new Error("Failed to get pre-signed URL");
            }

        } catch (error) {
            console.log(error)
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