/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/field-notes",
        destination: "/",
        permanent: true,
      },
      {
        source: "/work",
        destination: "/#work",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
