/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
                {
                    hostname: "d2baas3wofcwk3.cloudfront.net"
                }
            ]
    }
    
};

export default nextConfig;
