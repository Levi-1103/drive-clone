import { env } from "@/env/server"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import {
    getSignedUrl,
    S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";

export async function DELETE(request: Request) {
    const { key } = await request.json()

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
        const createPresignedUrlWithClient = (key: string, s3Client: S3Client) => {
            const client = s3Client;
            const command = new GetObjectCommand({ Bucket: env.S3_NAME, Key: key });
            return getSignedUrl(client, command, { expiresIn: 3600 });
        };

        const clientUrl = await createPresignedUrlWithClient(key, client)

        return Response.json(clientUrl)
    } catch (error) {
        console.log(error)
        return Response.json({ error: error.message })
    }


}
