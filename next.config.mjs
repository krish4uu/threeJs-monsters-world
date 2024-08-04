/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    images: {
      unoptimized: true,
      loader: "akamai",
      path: "/",
    },
    basePath: "",
    assetPrefix: "/threeJs-monsters-world"
};
export default nextConfig;
