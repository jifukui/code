const net = require('net');
let connStatus = false;
let server;
let link = window.document.getElementById("link");
let ip = window.document.getElementById("ip");
let port = window.document.getElementById("port");
let debug =true;
let out4K=30;
const DE_1 = "001EC0906ACE";    
const DE_2 = "001EC090674A";    
const DE_4 = "001EC090DD4C";     
const DE_3 = "001EC090592D";     
const DE_5 = "001EC090a02e";     
const DE_6 = "001EC090b622";       
const DE_7 = "001EC090d6c4";      
const EN_1 = "001EC09084B0";      
const EN_2 = "001EC090B6D4";    
const EN_3 = "801f12531993";      
const EN_4 = "001EC090C103";      
const EN_5 = "001EC0909B21";     
const EN_6 = "001EC090fa9a";       
const EN_7 = "001EC0910e4c";  
let timer=new Array(7);  
let position=new Array(7);  
function login(){
    let status=connStatus;
    if(connStatus)
    {
        try{
            server.destroy();
        }catch(err){
            alert("连接关闭失败");
            return ;
        }
        status = false;    
    }
    else
    {
        try{
            server = net.connect(parseInt(port.value),ip.value);
            server.on("connect",()=>{
                server.write("require blueriver_api 3.0.0.0\r\n");
            });
            server.on("data",(data)=>{
                console.log("The data is "+data);
            });
            status = true;
        }catch(err){
            alert("连接建立失败 "+err);
        }
        // status = true;
    }
    if(status!==connStatus)
    {
        if(status){
            ip.setAttribute("disabled",true);
            port.setAttribute("disabled",true);
            link.setAttribute("value","关闭");
        }
        else{
            ip.removeAttribute("disabled",false);
            port.removeAttribute("disabled",false);
            link.setAttribute("value","连接");
        }
        connStatus=status;
    }
}
function clearTimer(){
    let i;
    for(i=0;i<timer.length;i++){
        if(timer[i])
        {
            clearInterval(timer[i]);
            timer[i]=false;
        }
    }
}
function clearsubscript(id){
    let dim = `DE_${id}`;
    dim=eval(dim);
    for(let i=0;i<9;i++){
        serversend(`leave ${dim}:HDMI:${i}`);
    }
}
function serversend(msg){
    let info=`${msg}\r\n`;
    if(debug){
        console.log(info);
    }
    server.write(info);
}
function allswitch(id){
    clearTimer();
    let value=eval(`EN_${id}`);
    serversend(`set ${value} property streams[HDMI:0].configuration.source.value 0`);
    serversend(`join ${value}:HDMI:0 ALL_RX:0 genlock`);
}
let out=7;
function fastswitch(id){
    clearTimer();
    let value=eval(`EN_${id}`);
    //let dim = eval(`DE_${out}`);
    serversend(`set ${value} property streams[HDMI:0].configuration.source.value 0`);
    serversend(`join ${value}:HDMI:0 ALL_RX:0 fastswitch size 1920 1080 fps 60`);
}
function fastswitchwall(id,widht=1920,height=1080,w=1920,h=1080){
    clearTimer();
    let val=`EN_${id}`;
    let info;
    val=eval(val);
    serversend(`set ${val} property streams[HDMI:0].configuration.source.value 0`);
    serversend(`join ${val}:HDMI:0 ${DE_1}:0 wall_fs size ${widht} ${height} keep ${w/2} ${h/2} offset 0 0 viewport 0 0 ${widht}  ${height} fps 60`);
    serversend(`join ${val}:HDMI:0 ${DE_2}:0 wall_fs size ${widht} ${height} keep ${w/2} ${h/2} offset ${w/2} 0 viewport 0 0 ${widht}  ${height} fps 60`)
    serversend(`join ${val}:HDMI:0 ${DE_4}:0 wall_fs size ${widht} ${height} keep ${w/2} ${h/2} offset 0 ${h/2} viewport 0 0 ${widht}  ${height} fps 60`);
    serversend(`join ${val}:HDMI:0 ${DE_5}:0 wall_fs size ${widht} ${height} keep ${w/2} ${h/2} offset ${w/2} ${h/2} viewport 0 0 ${widht}  ${height} fps 60`)
}
function mul_4_1080(id){
    clearTimer();
    clearsubscript(id);
    let val=`DE_${id}`;
    val =eval(val);
    serversend(`layout pip_4x1080 create size 3840 2160`);
    serversend(`layout pip_4x1080 window 0 position 0 0 size 1920 1080 target 0`);
    serversend(`layout pip_4x1080 window 1 position 1920 0 size 1920 1080 target 1`)
    serversend(`layout pip_4x1080 window 2 position 0 1080 size 1920 1080 target 2`);
    serversend(`layout pip_4x1080 window 3 position 1920 1080 size 1920 1080 target 3`);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        serversend(`start ${dim}:HDMI:1`);
        serversend(`set ${dim} scaler size 1920 1080`);
        serversend(`set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);
    }
    serversend(`set ${val} multiview pip_4x1080 fps ${out4K}`)
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        serversend(`join ${dim}:HDMI:1 ${val}:${i}`);
    }
    
}
function mul_9_720(id){
    clearTimer();
    clearsubscript(id);
    let val=`DE_${id}`;
    val =eval(val);
    let info;
    info=`layout pip_9x720 create size 3840 2160\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 0 position 0 0 size 1280 720 target 0\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 1 position 1280 0 size 1280 720 target 1\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 2 position 2560 0 size 1280 720 target 2\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 3 position 0 720 size 1280 720 target 3\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 4 position 1280 720 size 1280 720 target 4\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 5 position 2560  720 size 1280 720 target 5\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 6 position 0 1440 size 1280 720 target 6\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 7 position 1280 1440 size 1280 720 target 7\r\n`;
    server.write(info);
    info=`layout pip_9x720 window 8 position 2560 1440 size 1280 720 target 8\r\n`;
    server.write(info);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`start ${dim}:HDMI:1\r\n`;
        server.write(info);
        info=`set ${dim} scaler size 1280 720\r\n`;
        server.write(info);
        info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
        server.write(info);
    }
    info = `set ${val} multiview pip_9x720 fps ${out4K} \r\n`;
    server.write(info);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`join ${dim}:HDMI:1 ${val}:${i}\r\n`;
        console.log(info);
        server.write(info);
        info=`join ${dim}:HDMI:0 ${val}:${i+4}\r\n`;
        console.log(info);
        server.write(info);
    }  
}
function mul_pip(id){
    clearTimer();
    clearsubscript(id);
    let val=`DE_${id}`;
    val =eval(val);
    let dim = EN_1;
    let info;
    let layout= "pip_pictureINpicture";
    let size = "1920 1080";
    let size1 = "1280 720";
    info=`start ${dim}:HDMI:1`;
    info=`set ${dim} scaler size 1280 720`;
    info=`layout ${layout} create size ${size}`;
    serversend(info);
    info = `layout ${layout} window 0 position 320 180 size ${size1} target 1`;
    serversend(info);
    info = `layout ${layout} window 1 position 0 0 size ${size} target 0`;
    serversend(info);
    info=`start ${dim}:HDMI:0`;
    serversend(info);
    info=`start ${dim}:HDMI:1`;
    serversend(info);
    info=`set ${dim} scaler size ${size1}`;
    serversend(info);
    info= `set ${dim} property streams[HDMI:0].configuration.source.value 0`
    serversend(info);
    info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 0`;
    serversend(info);
    info = `set ${val} multiview ${layout} size ${size} fps 60`;
    serversend(info);
    info=`join ${dim}:HDMI:0 ${val}:0`;
    serversend(info);
    info=`join ${dim}:HDMI:1 ${val}:1`;
    serversend(info);
}

function mul_circle(id){
    clearsubscript(id);
    let val=`DE_${id}`;
    val =eval(val);
    let dim = EN_2;
    let info;
    let layout= "pip_circle";
    let size = "3840 2160";
    let size1 = "1280 720";
    info=`start ${dim}:HDMI:1`;
    info=`set ${dim} scaler size 1280 720`;
    info=`layout ${layout} create size ${size}`;
    serversend(info);
    info = `layout ${layout} window 0 position 2000 720 size ${size1} target 1`;
    serversend(info);
    info = `layout ${layout} window 1 position 0 0 size ${size} target 0`;
    serversend(info);
    info=`start ${dim}:HDMI:0`;
    serversend(info);
    info=`start ${dim}:HDMI:1`;
    serversend(info);
    info=`set ${dim} scaler size ${size1}`;
    serversend(info);
    info= `set ${dim} property streams[HDMI:0].configuration.source.value 1`
    serversend(info);
    info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`;
    serversend(info);
    info = `set ${val} multiview ${layout} size ${size} fps ${out4K}`;
    serversend(info);
    info=`join ${dim}:HDMI:0 ${val}:0`;
    serversend(info);
    info=`join ${dim}:HDMI:1 ${val}:1`;
    serversend(info);
    position[id-1]=0;
    if(timer[id-1])
    {
        clearImmediate(timer[id-1]);
    }
    timer[id-1]=setInterval(circle,1000,id);
}
function circle(id){
    let dim=`DE_${id}`;
    dim =eval(dim);
    let layout="pip_circle";
    let x,y;
    let value= position[id-1];
    value=(value+2)%360;
    position[id-1]=value;
    x=Math.floor(1280+Math.cos(value*2*Math.PI/360)*720);
    y=Math.floor(720-Math.sin(value*2*Math.PI/360)*720);
    if(x%2)
    {
        x-=1;
    }
    if(y%2)
    {
        y-=1;
    }
    serversend(`layout ${layout} window 0 position ${x} ${y} size 1280 720 target 1`);
    serversend(`set ${dim} multiview ${layout}  fps ${out4K}`);
}
function mul_pap(id){
    clearTimer();
    clearsubscript(id);
    let val=`DE_${id}`;
    val =eval(val);
    let info;
    info=`layout pap create size 3840 2160\r\n`;
    server.write(info);
    info=`layout pap window 0 position 200 200 size 1920 1080 target 0\r\n`;
    server.write(info);
    info=`layout pap window 1 position 1920 1080 size 1920 1080 target 1\r\n`;
    server.write(info);
    
    for(let i=0;i<2;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`start ${dim}:HDMI:1\r\n`;
        server.write(info);
        info=`set ${dim} scaler size 1920 1080\r\n`;
        server.write(info);
        info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
        server.write(info);
    }
    info = `set ${val} multiview pap fps ${out4K} \r\n`;
    server.write(info);
    for(let i=0;i<2;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`join ${dim}:HDMI:1 ${val}:${i}\r\n`;
        console.log(info);
        server.write(info);
    }

    
}
let predev;

function mul_pip_1a5(id){
    clearTimer();
    clearsubscript(id);
    let val=`DE_${id}`;
    val =eval(val);
    predev=id;
    let val1=`EN_1`;
    val1 =eval(val1);
    let info;
    info=`layout mul_pip_1a5 create size 3840 2160\r\n`;
    server.write(info);
    info=`layout mul_pip_1a5 window 0 position 1280 720 size 2560 1440 target 0\r\n`;
    server.write(info);
    info=`layout mul_pip_1a5 window 1 position 0 0 size 1280 720 target 1\r\n`;
    server.write(info);
    info=`layout mul_pip_1a5 window 2 position 1280 0 size 1280 720 target 2\r\n`;
    server.write(info);
    info=`layout mul_pip_1a5 window 3 position 2560 0 size 1280 720 target 3\r\n`;
    server.write(info);
    info=`layout mul_pip_1a5 window 4 position 0 720 size 1280 720 target 4\r\n`;
    server.write(info);
    info=`layout mul_pip_1a5 window 5 position 0  1440 size 1280 720 target 5\r\n`;
    server.write(info);

    info=`set ${val1} scaler size 2560 1440\r\n`;
    server.write(info);
    info = `set ${val1} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
    server.write(info);
    info = `set ${val1} property  streams[HDMI:0].configuration.source.value 1\r\n`;
    server.write(info); 

    for(let i=1;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`start ${dim}:HDMI:1\r\n`;
        server.write(info);
        info=`set ${dim} scaler size 1280 720\r\n`;
        server.write(info);
        info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
        server.write(info);
        info = `set ${dim} property  streams[HDMI:0].configuration.source.value 1\r\n`;
        server.write(info); 
    }
    info = `set ${val} multiview mul_pip_1a5 fps ${out4K} \r\n`;
    server.write(info);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`join ${dim}:HDMI:0 ${val}:${i+1}\r\n`;
        server.write(info);
        if(i==0)
        {
            info=`join ${dim}:HDMI:1 ${val}:0\r\n`;
            server.write(info);
        }
        if(i==3)
        {
            info=`join ${dim}:HDMI:1 ${val}:5\r\n`;
            server.write(info);
        }
    }
}


function mul_pip_1a5_sw(id){
    let val=`EN_${id}`;
    val =eval(val);
    let val1=`DE_${predev}`;
    val1= eval(val1);

    let info;
    info=`set ${val} scaler size 2560 1440\r\n`;
    server.write(info);
    info=`join ${val}:HDMI:1 ${val1}:0\r\n`;
    console.log(info);
    server.write(info);


}