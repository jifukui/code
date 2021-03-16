const asynchook = require("async_hooks");
const fs = require("fs");
const http = require('http');
const os = require("os");
const file = fs.openSync("./file.txt","w+");
{
    let num = 0 ;
    let hook={
        init:function(asyncId, type, triggerAsyncId, resource){
            fs.writeFileSync(file,`init asyncId is ${asyncId} and type is ${type} triggerAsyncId is ${triggerAsyncId} resource is ${resource} ${os.EOL}`)
        }, 
        before:function(asyncId){
            fs.writeFileSync(file,`before asyncId is ${asyncId} ${os.EOL}`)
        }, 
        after:function(asyncId){
            fs.writeFileSync(file,`after asyncId is ${asyncId} ${os.EOL}`)
        }, 
        destroy:function(asyncId){
            num++;
            fs.writeFileSync(file,`destroy asyncId is ${asyncId} ${os.EOL}`)
        }, 
        promiseResolve(asyncId){
            fs.writeFileSync(file,`promiseResolve asyncId is ${asyncId} ${os.EOL}`)
        }
    }
    let info = asynchook.createHook(hook);
    info.enable();
    //info.disable()
    
}

{
    var data = new Promise((res,rej)=>{
        setTimeout(()=>{
            res("good game")
        },2000);
    });
    data.then(str=>{
        console.log(`good ${str}`)
    }).catch(err=>{
        console.log(`error ${err}`);
    }).finally(()=>{
        console.log("结束")
    })
}