import { env } from "@/env/server"
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'



export async function POST(request: Request) {
    const { filename, contentType } = await request.json()


    try {
        const client = new S3Client({
            region: env.S3_REGION,
            credentials: {
                accessKeyId: env.S3_ACCESS_KEY_ID,
                secretAccessKey: env.S3_SECRET_ACCESS_KEY
            },
            endpoint: env.S3_ENDPOINT,
            forcePathStyle: true,
        })
        const { url, fields } = await createPresignedPost(client, {
            Bucket: env.S3_NAME,
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
