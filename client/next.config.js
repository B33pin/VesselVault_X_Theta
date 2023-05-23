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
};

module.exports = nextConfig;
