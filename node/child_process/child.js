const net = require('net');
const { resolve } = require('path');
//process.stdout.write("hello this is child");
var server = net.createServer((c)=>{
    //console.dir(c);
    c.on("connect",()=>{
        //process.stdout.write("have connect");
    });
    c.on("data",(data)=>{
        sendinfo(data,c)
        //c.write("jifukui\r\n");
    });
    c.on("close",()=>{
        console.log("Have close");
    })
});
const  sendinfo = async function(data,conn){
    try{
        await sendinfowait(data);
    }
    catch(e){
        console.log("have error "+e);
    }
    process.stdin.removeAllListeners("data");
    process.stdin.on("data",data=>{
        conn.write(`The father info is ${data}\r\n`);
    });
    //await conn.write("end info \r\n");
}
/*
process.stdin.on("data",data=>{
    console.log("the child data is "+data);
});*/
function sendinfowait(data){
    return new Promise(resolve=>{
        setTimeout(()=>{
            process.stdout.write("The data is " +data);
            resolve(); 
        },2000,data)
    });
}
server.listen(8080);