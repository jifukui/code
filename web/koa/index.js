const koa = require("koa");
const LRU = require('lru-cache');
const staticCache = require('koa-static-cache')
const static = require("koa-static");
const Route = require("koa-router");
const bodyparser = require("koa-bodyparser");
const jwt = require('koa-jwt');

const path = require("path");
const fs = require("fs");
const IO = require("koa-socket-2");
const {spawn} = require("child_process");

const io = new IO();
const app = new koa();
const router = new Route();
let files = new LRU({ max: 100 })
/*
const rpc = spawn("node",["./process/RPC1.js"]);
rpc.stdout.on("data",data=>{
    console.log("The data is "+data);
})*/
//配置静态文件处理
//const file=fs.readFileSync(path.join(__dirname,"/static/index.html"));
function gettonken(){
    console.log("good get token");
    return true;
}
function getsecret(){
    console.log("good get Secret");
    return "jifukui";
}
router
    .get("index","/index.html",async(ctx,next)=>{
        console.log("i Have called");
        ctx.response.type = "text/html"
        ctx.response.body = "Hello this is jifukui index.html";
        await next();
    })
    .get("/jifukui.html",async(ctx,next)=>{
        console.log("Have this");
        ctx.response.body="Hello this is jifukui";
        await next();
    })
    .get("/ligline.cgi",async(ctx,next)=>{
        console.log("this is good");
        ctx.response.body="good boy";
        io.broadcast("info","hello this is jifukui");
        io.broadcast("JI_USER_INFO","hello this is jifukui");
        io.broadcast("USER_INFO","hello this is jifukui");
        await next();
    })
    .post("/",async(ctx,next)=>{
        ctx.body="post";
        await next();
    })
    .put("/",async(ctx,next)=>{
        ctx.body="put";
        await next();
    })
    .del("/",async(ctx,next)=>{
        ctx.body="del";
        await next();
    })
    .get(/.*/,async(ctx,next)=>{
        console.log("value not this path "+ctx.url);
        ctx.redirect("/index.html",301);
        next();
    })
    .all("/",async(ctx,next)=>{
        console.log("The modth is " +ctx.request.url);
        await next();
    })
router.redirect("/jifukui.txt","index",301);
//app.use(bodyparser());
app.use(async(ctx,next)=>{
    console.log(`the url is ${ctx.url}`);
    console.log("jifukui handler");
    await next().catch((err)=>{
        if(401 == err.status){
            //ctx.redirect("/login.html",301);
            ctx.status = 401;
            ctx.body = "jifukui"
        }else{
            throw err;
        }
    })
    console.log("jifukui handler over");
});
app.use(jwt({secret:getsecret,getToken:gettonken}).unless({
    path:["/login.html"]
}));
app.use(staticCache(path.join(__dirname,"static"),{
    maxAge:365*24*60*60,
    buffer:true,
    gzip:true,
    usePrecompiledGzip:true,
    dynamic:true,
    preload:true
},files));
//app.use(static(path.join(__dirname,"/static")));
app.use(router.routes());
io.attach(app);
io.use(async(ctx,next)=>{
    console.log("good for io");
    await next();
})
io.on("SOCKET_JI",(data)=>{
    console.log("The data is " + data);
});
io.on("connect",msg=>{
    console.log("The message is ");
})
app.use(async(ctx,next)=>{
    console.log(`i am is the laster`);
    await next();
});
app.on("error",(err)=>{
    console.log(`Have get the error`);
});



app.listen(8080,function(){
    console.log("good start work");
    //ServerInfo();
});






function ServerInfo(){
    console.log(`midddleware is ${app.middleware.length}`);
    console.log(`env is ${app.env}`);
    console.log(`The proxy is ${app.proxy}`);
    //console.log(`the server is `);
    //console.dir(app);
}