/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.pacificworldschool.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "www.pacificworldschool.com",
        pathname: "/frontend/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
