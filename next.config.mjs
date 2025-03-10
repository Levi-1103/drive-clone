
import { fileURLToPath } from "node:url";
// import createJiti from "jiti";
// const jiti = createJiti(fileURLToPath(import.meta.url));


import { createJiti } from "jiti";
const jiti = createJiti(import.meta.url);
// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
// jiti("./src/env/server.ts");

jiti.import("./src/env/server.ts");



/** @type {import("next").NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
