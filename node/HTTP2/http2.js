//http2的网站
const http2 = require("http2");
const fs = require("fs");
const { Stream } = require("stream");
const server = http2.createSecureServer({
    key:fs.readFileSync("server-key.pem"),
    cert:fs.readFileSync("server-cert.pem")
});
server.on("error",(err)=>{
    console.log(`have error is ${err}`);
})
server.on("stream",(stream,headers)=>{
    console.log('have some data');
    stream.respond({
        'content-type':"text/html;charset=utf-8",
        ":status":200
    })
    stream.end('<h1>你好世界</h1>');
});
server.listen(8443);