/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_APP_FIREBASE_API_KEY: process.env.NEXT_APP_FIREBASE_API_KEY,
    NEXT_APP_FIREBASE_AUTH_DOMAIN: process.env.NEXT_APP_FIREBASE_AUTH_DOMAIN,
    NEXT_APP_FIREBASE_PROJECT_ID: process.env.NEXT_APP_FIREBASE_PROJECT_ID,
    NEXT_APP_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_APP_FIREBASE_STORAGE_BUCKET,
    NEXT_APP_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_APP_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_APP_FIREBASE_APP_ID: process.env.NEXT_APP_FIREBASE_APP_ID,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
