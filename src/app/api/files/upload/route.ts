import { auth } from "@/auth"
import { env } from "@/env/server"
import { S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid';


export async function GET(req: Request) {

    const session = await auth();
    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    const { contentType } = await req.json()

    const fileKey = session.user?.id + "/" + uuidv4();

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
            Key: fileKey,
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


        return NextResponse.json({ url, fields, })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }
};
