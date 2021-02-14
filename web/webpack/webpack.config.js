const path=require("path");
let home = path.resolve(__dirname);
console.log(`the home path is ${home}`)
//const ExtractTextPlugin=require('extract-text-webpack-plugin');
module.exports={
    /**输入文件 */
    entry:{
        utils:path.resolve(home,"src/js","main.js"),
        es6:path.resolve(home,"src/es6","index.js"),
    },
    /**输出文件 */
    output:{
        filename:'[name].js',
        path:path.resolve(home,"dist")
    },
    /**模块 */
    module:{
        rules:[
            {
                test:/.js$/,
                use:"babel-loader"
            }
        ]
    },
    /**插件 */
    plugins:[
    ],
    /**服务 */
    devServer:{},
    mode: 'production'
}