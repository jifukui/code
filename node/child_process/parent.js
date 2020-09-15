const {spawn, spawnSync} = require('child_process');
let i=0;
const child=spawn('node',['child.js'],{
    stdio:"pipe"
});
//console.log("good end of this "+child.connected);
child.stdout.on("data",msg=>{
    console.log("The fahet get info is " +msg);
    child.stdin.write(`The fathe data is ${i++} \r\n`);
});
child.on("close",()=>{
    console.log("The child process have exit\r\n");
});
child.stderr.on('error',err=>{
    console.dir(err);
});
child.stderr.on('data',err=>{
    console.log(err.toString());
});