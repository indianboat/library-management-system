/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    production:"https://amrita-lms.vercel.app",
    local:"http://localhost:3000"
  }
}

module.exports = nextConfig
