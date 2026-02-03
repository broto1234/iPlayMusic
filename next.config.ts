
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["127.0.0.1:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "t.scdn.co",
      },
      {
        protocol: "https",
        hostname: "charts-images.scdn.co",
      },
    ],
  },
};

export default nextConfig;
