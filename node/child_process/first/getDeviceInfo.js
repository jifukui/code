const net = require('net');
const fs = require('fs');
let server = net.connect(6970,"192.168.20.221");
let command=[];
let info="";
server.on("connect",()=>{
    console.log("have connect");
    Init();
    setInterval(() => {
        if(command.length>0){
            let data=command.shift();
            Send(data);
        }
    }, 10);
});
function Send(msg){
    console.log(`The send info is ${msg} \r\n`);
    server.write(`${msg}\r\n`);
}
function Init(){
    command.push("version");
    command.push("require blueriver_api 3.0.0.0");
    command.push("get all device");
    command.push("mode async on");
}
server.on("data",(msg)=>{
    info +=msg;
    let tem=info.indexOf("\r\n");
    if(tem>-1){
        let value =info.slice(0,tem+1);
        info=info.slice(tem+2,info.length);
        try{
            let str=value.slice(0,tem);
            data=JSON.parse(str);
            commandHandle(data);
        }catch(err){
            console.log("have error "+err);
        }
    }
});
function commandHandle(data){
    console.log("the info type is "+data.status);
    switch(data.status){
        case "SUCCESS":{
            if(data.result&&data.result.devices){
                let device =data.result.devices;
                let len=device.length;
                if(len>0){
                    for(let i=0;i<len;i++){
                        let name =device[i].device_id;
                        var date = new Date();
                        let filename  = `./${name.toUpperCase()}/${date.getTime()}`
                        fs.writeFile(`${filename}`,JSON.stringify(device[i]),(err)=>{
                            if(err){
                                console.log("write file have error "+err);
                            }
                        });
                    }
                }
            }
            else{
                console.log("data.result"+typeof(data.result));
                console.log("data.result.devices"+typeof(data.result.devices));
            }
            break;
        }
        case "ERROR":{
            console.log("Have Error ");
            break;
        }
        case "NOTIFICATION":{
            if(data&&data.result.events.length>0)
            {
                let value = data.result.events;
                for(let i=0;i<value.length;i++){
                    command.push(`request ${value[i].request_id}`);
                }
            }
            break;
        }
        case "PROCESSING" :{
            command.push(`request ${data.request_id}`);
            break;
        }
        default:{
            console.log("Have another info");
        }

    }
}