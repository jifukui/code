const Koa = require('koa');
const path = require("path")
const server = require("net");
const static = require('koa-static-cache');
const koaBody = require("koa-body");
// const device = require("./query").deviceinfo;
const Route = require("@koa/router");
const LRU = require('lru-cache');
const app = new Koa();
const router = new Route();
// let files = new LRU({ max: 100 })
let files
app.use(async (ctx,next) => {
    console.time()
    console.log(`ctx.url = ${ctx.request.url}`)
	if(ctx.url==="/"){
        ctx.redirect("/index.html");
    }
	await next();
    console.timeEnd();
});
app.use(static(path.join(__dirname,"static"),{
    maxAge:3,
    buffer:true,
    gzip:true,
    usePrecompiledGzip:true,
    dynamic:true,
    preload:false,
    filter:["first.html","opencv.js"]
},files));
// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 2 * 1024 * 1024 ,  
//         multipart: true,
//         uploadDir: __dirname + '/uploads'
//     }
// }));
app.listen(8000);
app.on("error",(err)=>{
    console.log(`on error is ${err.status}`);
})