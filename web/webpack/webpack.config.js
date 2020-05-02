const path=require("path");
//const ExtractTextPlugin=require('extract-text-webpack-plugin');
module.exports={
    /**输入文件 */
    entry:{
        utils:'./utils.js',
        audioswitch:'./audioswitch.js'
    },
    /**输出文件 */
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,"./dist")
    },
    /**模块 */
    module:{
        /*
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    {
                        loader:"css-loader"
                    }
                ]
            }
        ]*/
    },
    /**插件 */
    plugins:[
        /*new ExtractTextPlugin({
            filename:'[name]_[contenthash:8].css'
        })*/
    ],
    /**服务 */
    devServer:{}
}