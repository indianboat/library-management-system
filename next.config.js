/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    mongodb_uri:"mongodb://root:library_database852@ac-g7xlz68-shard-00-00.vpadejq.mongodb.net:27017,ac-g7xlz68-shard-00-01.vpadejq.mongodb.net:27017,ac-g7xlz68-shard-00-02.vpadejq.mongodb.net:27017/library-db?ssl=true&replicaSet=atlas-12u2xv-shard-0&authSource=admin&retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
