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
      {
        source: "/work/financial-rag-chatbot",
        destination: "/work/filing-intelligence-rag",
        permanent: true,
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
      // Unlisted second resume cut (public/resume2.pdf) at a clean URL.
      // Not linked from the site or the sitemap; shared deliberately.
      {
        source: "/resume2",
        destination: "/resume2.pdf",
      },
    ];
  },
};

export default nextConfig;
