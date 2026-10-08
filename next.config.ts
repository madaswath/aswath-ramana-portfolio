import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["127.0.0.1"],
  async rewrites() {
    if (process.env.NODE_ENV === "production") return [];
    return [{ source: "/api/chat", destination: "http://127.0.0.1:43127/api/chat" }];
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
