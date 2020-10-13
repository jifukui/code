const dgram = require('dgram');
const server =dgram.createSocket('udp4')
server.on("message",(msg,rinfo)=>{
    console.log(`Get Message form ${rinfo.address}:${rinfo.port} is ${msg}`);
    server.send("hello this is jifukui",50000,"255.255.255.255");
})
server.bind(5000);
