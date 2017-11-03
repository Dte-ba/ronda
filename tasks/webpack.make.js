'use strict';
/*eslint-env node*/
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
var WebpackCdnPlugin = require('webpack-cdn-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var fs = require('fs');
var path = require('path');

module.exports = function makeWebpackConfig(options) {
    /**
     * Environment type
     * BUILD is for generating minified builds
     */
    var BUILD = !!options.BUILD;
    var DEV = !!options.DEV;
    var TEST = !!options.TEST;

    /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
    var config = {
        entry: {
            app: './client/ronda.js',
            polyfills: './client/polyfills.js',
            //vendor: [
            //    'angular',
            //    'angular-animate',
            //    'angular-aria',
            //    'angular-cookies',
            //    'angular-resource',
            //    'angular-messages',
            //    'angular-sanitize',
            //    'angular-material',
            //    'angular-ui-router',
            //    'jquery',
            //    'lodash'
            //]
        },
        devtool: 'source-map',
        output: {
            // Absolute output directory
            path: BUILD ? path.join(__dirname, '/dist/client/') : path.join(__dirname, '/.tmp/'),
    
            // Output path from the view of the page
            // Uses webpack-dev-server in development
            publicPath: BUILD || DEV || E2E ? '/' : `http://localhost:${8080}/`,
            //publicPath: BUILD ? '/' : 'http://localhost:' + env.port + '/',
    
            // Filename for entry points
            // Only adds hash in build mode
            filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
    
            // Filename for non-entry points
            // Only adds hash in build mode
            chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['babel-preset-env'],
                        plugins: [
                            require('babel-plugin-angularjs-annotate'), 
                            require('babel-plugin-transform-class-properties')
                        ]
                      }
                    }
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('precss'),
                                    require('autoprefixer')
                                ]
                            }
                        },
                        {
                            loader: "sass-loader", // compiles Sass to CSS
                        }
                    ]
                }, {
                    // ASSET LOADER
                    // Reference: https://github.com/webpack/file-loader
                    // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                    // Rename the file using the asset hash
                    // Pass along the updated reference to your code
                    // You can add here any file extension you want to get copied to your output
                    test: /\.(svg|woff|woff2|ttf|eot)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                //publicPath: 'assets/'
                            } 
                        }
                    ]
                    
                }, {
                    // ASSET LOADER
                    // Reference: https://github.com/webpack/file-loader
                    // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                    // Rename the file using the asset hash
                    // Pass along the updated reference to your code
                    // You can add here any file extension you want to get copied to your output
                    test: /\.(png|jpg|jpeg|gif|svg)([\?]?.*)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                //publicPath: 'assets/'
                            } 
                        }
                    ]
                }
            ]
        }
    };

    config.plugins = [
        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        // new ForkCheckerPlugin(),

        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('[name].[hash].css', {
            disable: !BUILD || TEST
        }),

        new CommonsChunkPlugin({
            name: 'vendor',

            // filename: "vendor.js"
            // (Give the chunk a different name)

            minChunks: Infinity
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        })
    ];
    
    // Skip rendering index.html in test mode
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    if(!TEST) {
        let htmlConfig = {
            template: 'client/_index.html',
            filename: '../../client/index.html',
            alwaysWriteToDisk: true
        }
        config.plugins.push(
          new HtmlWebpackPlugin(htmlConfig),
          new HtmlWebpackHarddiskPlugin(),
          //new WebpackCdnPlugin({
          //  modules: [
          //    {
          //      name: 'vue',
          //      var: 'Vue',
          //      style: 'dist/vue.css'
          //    },
          //    {
          //      name: 'vue-router'
          //    }
          //  ],
          //  publicPath: '/node_modules'
          //})
        );
    }

    // Add build specific plugins
    if(BUILD) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }),

            // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
            // Define free global variables
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        );
    }

    if(DEV) {
        config.plugins.push(
            // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
            // Define free global variables
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"development"'
                }
            })
        );
    }

    config.devServer = {
        contentBase: './client/',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    };

    config.cache = DEV;

    return config;
};
