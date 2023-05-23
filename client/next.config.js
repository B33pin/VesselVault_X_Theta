/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "player.thetavideoapi.com",
      "lh3.googleusercontent.com",
      "ipfs-2.thirdwebcdn.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vesselvault-default-rtdb.firebaseio.com//:path*",
      },
    ];
  },
};

module.exports = nextConfig;
