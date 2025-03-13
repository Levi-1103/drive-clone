import { deleteFile } from "@/app/actions";
import { auth } from "@/auth";
import { env } from "@/env/server";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// export const DELETE = auth(async function DELETE(req) {
//     if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

//     const { searchParams } = new URL(req.url);

//     const key = searchParams.get("key")

//     if (!key) return NextResponse.json({ message: "Bad Request" }, { status: 400 })

//     try {
//         const client = new S3Client({
//             region: env.S3_REGION,
//             credentials: {
//                 accessKeyId: env.S3_ACCESS_KEY_ID,
//                 secretAccessKey: env.S3_SECRET_ACCESS_KEY
//             },
//             endpoint: env.S3_ENDPOINT,
//             forcePathStyle: true,
//         })


//         const deleteCommand = await client.send(new DeleteObjectCommand({ Bucket: env.S3_NAME, Key: key }));

//         await deleteFile(key, req.auth.user?.id!)


//         return NextResponse.json(deleteCommand)
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ error: error.message })
//     }

// });

export async function DELETE(req: Request) {

    const session = await auth();
    if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    const { searchParams } = new URL(req.url);

    const key = searchParams.get("key")

    if (!key) return NextResponse.json({ message: "Bad Request" }, { status: 400 })

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


        const deleteCommand = await client.send(new DeleteObjectCommand({ Bucket: env.S3_NAME, Key: key }));

        await deleteFile(key, session.user?.id!)


        return NextResponse.json(deleteCommand)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error })
    }

}
