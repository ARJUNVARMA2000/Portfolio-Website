/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/field-notes",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
