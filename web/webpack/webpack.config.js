const path=require("path");
const { webpack } = require("webpack");
const minicssplugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const home = path.resolve(__dirname);

//const ExtractTextPlugin=require('extract-text-webpack-plugin');
module.exports={
    /**输入文件 */
    entry:{
        utils:path.resolve(home,"src/js","main.js"),
        es6:path.resolve(home,"src/es6","index.js"),
    },
    /**输出文件 */
    output:{
        filename:'[name]_[chunkhash:8].js',
        path:path.resolve(home,"dist")
    },
    /**模块 */
    module:{
        rules:[
            {
                test:/.js$/,
                use:"babel-loader"
            },{
                test:/.css$/,
                use:[
                    // "style-loader",
                    minicssplugin.loader,
                    "css-loader",
                    // {
                    //     loader:"postcss-loader",
                    //     options:{
                    //         plugins:()=>{
                    //             require("autoprefixer")({
                    //                 browers:[
                    //                     'last 2 version',
                    //                 ]
                    //             })
                    //         }
                    //     }
                    // }
                ]
            },{
                test:/.less$/,
                use:[
                    // "style-loader",
                    
                    minicssplugin.loader,
                    "css-loader",
                    "less-loader",
                    "postcss-loader"
                ]
            },{
                test:/.(png|gif|jpg|jpeg)$/i,
                use:["file-loader"]
            },{
                test:/.(woff)$/i,
                use:[{
                    loader:"file-loader",
                    options:{
                        name:'[name]_[hash:8].[ext]'
                    }
                }]
            }
        ] 
    },
    /**插件 */
    plugins:[
        new minicssplugin({
            filename:"[name]_[contenthash:8].css"
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
          })
    ],
    /**服务 */
    devServer:{
        // contentBase:"./dist",
        // port:8000,
        // hot:true,
        // hotOnly:true
    },
    // mode: 'development'
    mode:"production"
}