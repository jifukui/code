const https = require('https');
const fs = require('fs');
const pem = require("pem");
pem.config({
    pathOpenSSL:"/usr/bin/openssl"
});
pem.createCertificate({
    days:1,
    selfSigned:true
},function (err,keys) {
    if(err){
        console.log(`have get error ${err}`);
    }else{
        console.log(`the keys is `);
        console.dir(keys);
        https.createServer({
            key:keys.serviceKey,
            cert:keys.certificate,
        },function (req,res) {
            console.log("i Have get a info")
            res.writeHead(200);
            res.end("hello,this is jifukui");
        }).listen(8000);
        console.log(`good for this`)
    }
})
