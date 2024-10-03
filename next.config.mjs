/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Beranda",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["firebasestorage.googleapis.com"], // Add this line to allow images from Firebase Storage
  },
};

export default nextConfig;
