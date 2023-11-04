/** @type {import('next').NextConfig} */
const nextConfig = {}
const { createProxyMiddleware } = require('http-proxy-middleware');




module.exports = {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // Change '*' to the origin you want to allow, e.g., 'http://localhost:3000'
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PUT, DELETE, OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'http://localhost:3000'
,
            },
          ],
        },
      ];
    },
    async rewrites() {
        return [
          {
            source: '/blockchain/searchData', // Update with your API route path
            destination: 'http://localhost:2672', // MultiChain server URL
          },
        ];
      },
  };
  
