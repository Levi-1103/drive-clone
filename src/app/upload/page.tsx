'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function Page() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!file) {
            alert('Please select a file to upload.')
            return
        }

        setUploading(true)

        const response = await fetch(
            'http://localhost:3000/api/upload',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: file.name, contentType: file.type }),
            }
        )
        if (response.ok) {
            const { url, fields } = await response.json()


            const formData = new FormData()
            Object.entries(fields).forEach(([key, value]) => {
                formData.append(key, value as string)
            })
            formData.append('file', file)


            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const uploadResponse = await fetch(url, {
                method: 'POST',
                body: formData,
            })



            if (uploadResponse.ok) {
                alert('Upload successful!')
            } else {
                console.error('S3 Upload Error:', uploadResponse)
                alert('Upload failed.')
            }
        } else {
            alert('Failed to get pre-signed URL.')
        }

        setUploading(false)
    }

    return (
        <main className=''>
            <h1>Upload a File to S3</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                        id="file"
                        type="file"
                        onChange={(e) => {
                            const files = e.target.files
                            if (files) {
                                setFile(files[0])
                            }
                        }}
                        accept="image/png, image/jpeg"
                    />
                </div>

                <Button type="submit" disabled={uploading}>
                    Upload
                </Button>
            </form>
        </main>
    )
}