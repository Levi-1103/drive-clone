import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        AUTH_SECRET:
            process.env.NODE_ENV === "production"
                ? z.string()
                : z.string().optional(),
        AUTH_GITHUB_ID: z.string(),
        AUTH_GITHUB_SECRET: z.string(),
        DATABASE_URL: z.string().url(),
        S3_ACCESS_KEY_ID: z.string(),
        S3_SECRET_ACCESS_KEY: z.string(),
        S3_ENDPOINT: z.string().url(),
        S3_REGION: z.string(),
        S3_NAME: z.string(),
        AUTH_TRUST_HOST: z.string(),


        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
    },
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env
});