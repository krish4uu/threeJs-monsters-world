/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "export",
    reactStrictMode: true,
    images: {
      unoptimized: true,
      loader: "akamai",
      path: "/",
    },
};
export default nextConfig;
