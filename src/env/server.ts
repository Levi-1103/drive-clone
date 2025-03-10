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
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
    },
    emptyStringAsUndefined: true,
    experimental__runtimeEnv: process.env
});