/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // This allows loading images from any HTTPS domain
      },
    ],
  },

  // Important for AWS Amplify + API routes + SSR
  output: "standalone",

  // Optional: Enable if you're using server actions
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
