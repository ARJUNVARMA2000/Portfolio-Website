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
  async rewrites() {
    return [
      // Serve the static reading copy of 1984 (public/1984.html) at a clean URL.
      {
        source: "/1984",
        destination: "/1984.html",
      },
    ];
  },
};

export default nextConfig;
