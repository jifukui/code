const net = require("net");
const jifukui = require("./sdvoe_command");
let cmdObj={
    index:0,
    str:"",
    endflag:"}\r\n"
}
class jifukui_sdvoe{
    constructor(command){
        this.handler=jifukui.get(command)
        if(!this.handler){
            console.log("have not this command");
            return ;
        }
        console.log("have this command");
        this.cmd=`${command}\n`;
        this.ok=null;
        this.cancle=null;
        this.data ="";
        this.promise=new Promise((res,rej)=>{
            this.ok=res;
            this.cancle=rej;
        }).then(this.success,this.failed).finally(console.log("over"));
    }
    success(val){
        //console.dir(val);
        let  data= val.data;
        console.log(`good this data is ${data}`);
        data=JSON.parse(data);
        val.handler(data);
    }
    failed(val){
        //console.dir(val);
        console.log(`error this data is `);
    }
}
let command=[];
let flag=false;
let server=net.createConnection({host:"192.168.20.221",port:6970},(err)=>{
    if(err){
        console.log("have error");
    }else{
        console.log("the have connect ");
        flag=true;
        Sendcommand("require blueriver_api 3.0.0.0");
    }
});
function Sendcommand(cmd){
    console.log("the command is "+cmd);
    let val=new jifukui_sdvoe(cmd);
    command.push(val);
    server.write(val.cmd);
}
server.on("error",(err)=>{
    console.log(`the error is ${err}`);
});
server.on("data",(data)=>{
    console.log("Have get data");
    data=data.toString();
    //console.log("Have get data "+data);
    if(cmdObj.str.length){
        cmdObj.str+=data;
    }else{
        cmdObj.str=data;
    }
    let index=-1;
    while((index=cmdObj.str.indexOf(cmdObj.endflag,cmdObj.index))>-1)
    { 
        let cmd=cmdObj.str.slice(0,index+1);
        let str=cmdObj.str.slice(index+3);
        cmdObj.str=str?str:"";
        let val =command.pop();
        //console.dir(val);
        val.data=cmd;
        val.ok(val);
        cmdObj.index=0;
    }
    cmdObj.index=cmdObj.str.length-1;    
});