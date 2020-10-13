const net = require('net');
var server = net.createServer((c)=>{
    //console.dir(c);
    c.on("connect",()=>{
        console.log("have connect");
        c.write("hello this is jifukui\r\n");
    });
    c.on("data",(data)=>{
        console.log("the data is "+data);
        c.write("hello this is jifukui1\r\n");
    });
    c.on("data",(data)=>{
        console.log("the data is "+data);
        c.write("hello this is jifukui2\r\n");
    });
    c.on("close",()=>{
        console.log("Have close");
    })
});
server.listen(8080);