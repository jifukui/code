const udp = require("dgram");
let serve = udp.createSocket("udp4");
// 2f 03 f4 a2 01 00 00 00 00 00
let data = [0x2f,0x03,0xf4,0xa2,0x01,
0x00,0x00,0x00,0x00,0x00];
data = Buffer.from(data);
serve.on("message",(data,rem)=>{
    console.log(`data ${data}`);
    console.dir(rem)
})
// serve.send(data,6137,"255.255.255,255",()=>{
//     console.log("send");
// })
function send(){
    if(i%2==0){
        console.log("eq")
        ip++;
        address = `192.168.20.${ip}`
    }
    i++;
    console.log(address)
    serve.send(data,6137,address,(err)=>{
        if(err){
            console.log(err)
        }
        console.log("send");
    })
}
let ip = 1;
let i=0;
let address =`192.168.20.${ip}`;
setInterval(send,500);
serve.bind(6971,"192.168.20.29",()=>{
    // serve.setBroadcast(true)
   
})
