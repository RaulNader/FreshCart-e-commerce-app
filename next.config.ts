import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [new URL("https://ecommerce.routemisr.com/**/**")],
  },
};

export default nextConfig;
