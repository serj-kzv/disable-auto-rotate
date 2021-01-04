const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const plugins = [
    new CopyPlugin({
        patterns: [
            {
                from: '**/!(*.js)',
                to: distDir,
                context: srcDir
            }
        ]
    })
];
const cfg = {
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    target: 'web',
    watchOptions: {
        ignored: ['node_modules'],
        poll: 500 // is needed to avoid an issue with change detection
    }
};
const userJs = [
    'main.js',
    'disableLock.js',
    'disableMozLockOrientation.js'
];

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    if (isProduction) {
        cfg.optimization = {
            minimize: true,
            // https://github.com/webpack-contrib/terser-webpack-plugin
            minimizer: [new TerserPlugin({
                // sourceMap: false,
                parallel: true,
                // https://github.com/terser/terser#minify-options
                terserOptions: {
                    ecma: 2020,
                    compress: {
                        drop_console: true
                    }
                }
            })]
        };
    }

    return userJs.map(path => {
        return {
            entry: `./src/${path}`,
            output: {
                path: distDir,
                filename: path
            },
            plugins,
            ...cfg
        };
    });
};
