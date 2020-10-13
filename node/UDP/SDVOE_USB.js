const udp = require('dgram');
const server = udp.createSocket("udp4");
const connect = server.connect(6137,"192.168.20.2",err=>{
    if(err){
        console.log("have error "+err);
        return ;
    }
    console.log("good for  connect");
    let buf =Buffer.from("2f03f4a2c0a81202001b44100001");
    server.send(buf);
    // server.send(buf,6137,"192.168.20.2",err=>{
    //     if(err){
    //         console.log("send have error "+err);
    //         return ;
    //     }
    //     console.log("send info success\r\n");
    // })
});
server.on("message",msg=>{
    console.log("The message is "+msg);
})