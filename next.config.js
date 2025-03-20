/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
    webpack: (config, { isServer }) => {
        // Suppress debug messages from markdown editor dependencies
        config.plugins = config.plugins || []
        config.plugins.push(new webpack.DefinePlugin({
            'process.env.DEBUG': JSON.stringify(false)
        }))

        return config
    }
}

module.exports = nextConfig