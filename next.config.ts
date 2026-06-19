import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "customer-assets.emergentagent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com"
      },
      {
        protocol: "https",
        hostname: "unsplash.com"
      }
    ],
  },
};

export default nextConfig;
