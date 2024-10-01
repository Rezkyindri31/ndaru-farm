/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
