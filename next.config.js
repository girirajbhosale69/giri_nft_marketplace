const dedicatedEndPoint = 'https://ipfs.infura.io:5001';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [dedicatedEndPoint, 'giri-nft-marketplace.infura-ipfs.io'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
