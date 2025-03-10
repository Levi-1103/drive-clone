import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'



export async function POST(request: Request) {
    const { filename, contentType } = await request.json()


    try {
        const client = new S3Client({
            region: "eu-west-1",
            credentials: {
                accessKeyId: "sLCiq9XxUupUUriXGV0o",
                secretAccessKey: "6pSzKG9KLudVw0NgdTP3qXBb8V1Np2tqukTUkWVL"
            },
            endpoint: "https://minio-ocgw4kswo8w0sks8c8gc0cc8.komorebi.lol",
            forcePathStyle: true,
        })
        const { url, fields } = await createPresignedPost(client, {
            Bucket: "files",
            Key: filename,
            Conditions: [
                ['content-length-range', 0, 10485760], // up to 10 MB
                ['starts-with', '$Content-Type', contentType],
            ],
            Fields: {
                acl: 'public-read',
                'Content-Type': contentType,
            },
            Expires: 600, // Seconds before the presigned post expires. 3600 by default.
        })


        return Response.json({ url, fields, })
    } catch (error) {
        console.log(error)
        return Response.json({ error: error.message })
    }


}
