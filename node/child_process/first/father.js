const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const net =  require("net");
console.log(`芯片的CPU的数量为${numCPUs}`);
if(cluster.isMaster){
    console.log(`主进程正在运行 ${process.pid}`);
    let num = 0;
    function messagehand(msg){
        console.log(`the num is ${num}`);
        num++;
    }
    for(let i = 0 ; i < numCPUs ; i++){
        cluster.fork();
    }
    for(const id in cluster.workers){
        cluster.workers[id].on("message",messagehand)
    }
    cluster.on("exit",(worker,code,signal)=>{
        console.log(`工作进程${worker.process.pid}已退出`);
    });
}else{
    net.createServer(socket=>{
        console.log("have new connect");
        socket.on("data",(msg)=>{
            console.log("get the data is "+msg);
            socket.write("hello this is jifukui");
            console.log(`the pid is ${process.pid}`);
            process.send("good");
        });
    }).listen(9999);
    console.log(`工作进程${process.pid}已启动`);
}