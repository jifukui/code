const net_TCP  = require('net');
const net_UDP  = require('dgram');
const MAX = 100;
class WallOutput{
    constructor(id,position){
        this.id=id;
        this.position=position;
    }
    SetPosition(num){
        wSet(num);
        this.position = num;
    }
    CreatMommand(){
         return SetVideoWall(this.id,this.position);
    }
}

class Multiview1{
    constructor(id,position){
        this.id=id;
        this.position=position;
    }
    SetMultiview1Position(num){
        Multiview1Set(num);
        this.position = num;
    }
    CreatMultiview1Mommand(){

         return SetMultiview1(this.id,this.position);
    }
}
let USBInfo= [];
const USBInfo_msg=Buffer.from([0x2f,0x03,0xf4,0xa2,0x00,0x00,0x00,0x00,0x03,0x00]);
class USBObj{
    constructor(mac,ip,port=6137){
        let iip=[];
        this.ip_addr_hex=ip;

        for(let i=0;i<ip.length;i++){
            iip.push(ip[i]);
        }
        ip=iip.join(".");
        this.ip_addr=ip;
        this.port= port;
        this.MAC =mac;
        this.DeviceBind();
        this.CreatSocket();
    }
    DeviceBind(){
        let device_mac="";
        let decode=null;
        switch(this.MAC.toString("hex"))
        {
            case "001b44000003":
                device_mac=EN_1;
                decode = false;
                break;
            case "001b44000008":
                device_mac=EN_4;
                decode = false;
                break;
            case "001b44100001":
                device_mac=DE_1;
                decode = true;
                break;
            case "001b44100009":
                device_mac=DE_4;
                decode = true;
                break;
            case "001b44100002":
                device_mac=DE_3;
                decode = true;
                break;
        }
        this.device_mac=device_mac;
        this.decode=decode;
    }
    CreatSocket(){
        this.server = net_UDP.createSocket("udp4");
        this.server.connect(this.port,this.ip_addr,(err)=>{
            if(err){
                console.log("Have error "+err);
            }
            else
            {
                this.Getpairstatus();  
            }
        });
        this.server.on("message",(data)=>{
            console.log(this);
            let value=data.length;
            if(value>11){
                this.paired =true;
                this.pairdevice_Mac=data.slice(11,data.length);
            }
            else if(value ==11){
                this.paired =false;
            }
            
        });
    }
    Getpairstatus(){
        this.server.send(USBInfo_msg);
    }
    PairDevice(value){
        if(this.paired)
        {
            this.DePairDevice();
        }
        this.pairdevice_Mac=value;
        let data=[0x2f,0x03,0xf4,0xa2];
        data=data.concat(this.ip_addr_hex[0]);
        data=data.concat(this.ip_addr_hex[1]);
        data=data.concat(this.ip_addr_hex[2]);
        data=data.concat(this.ip_addr_hex[3]);
        data=data.concat([0x03,0x02]);
        data=data.concat(this.pairdevice_Mac[0]);
        data=data.concat(this.pairdevice_Mac[1]);
        data=data.concat(this.pairdevice_Mac[2]);
        data=data.concat(this.pairdevice_Mac[3]);
        data=data.concat(this.pairdevice_Mac[4]);
        data=data.concat(this.pairdevice_Mac[5]);
        data=Buffer.from(data);
        this.server.send(data);
        this.paired =true;
    }
    DePairDevice(){
        if(!this.paired)
        {
            return ;
        }
        let data=[0x2f,0x03,0xf4,0xa2];
        data=data.concat(this.ip_addr_hex[0]);
        data=data.concat(this.ip_addr_hex[1]);
        data=data.concat(this.ip_addr_hex[2]);
        data=data.concat(this.ip_addr_hex[3]);
        data=data.concat([0x03,0x03]);
        data=data.concat(this.pairdevice_Mac[0]);
        data=data.concat(this.pairdevice_Mac[1]);
        data=data.concat(this.pairdevice_Mac[2]);
        data=data.concat(this.pairdevice_Mac[3]);
        data=data.concat(this.pairdevice_Mac[4]);
        data=data.concat(this.pairdevice_Mac[5]);
        data=Buffer.from(data);
        this.server.send(data);
        this.paired=false;
        this.pairdevice_Mac=[];
    }
}

let connStatus = false;
let server_TCP;
let server_UDP;
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
const NUM = 7;
let woutport=new Array(NUM);
for(let i=0;i<NUM;i++){
    woutport[i] = new WallOutput(eval(`DE_${i+1}`),i+1);
}
function wSet(position){
    for(let i=0;i<NUM;i++){
        let port=woutport[i];
        if(port.position===position){
            port.position = MAX;
        }
    }
}
let Multiview1Inport=new Array(NUM);
for(let i=0;i<NUM;i++){
    Multiview1Inport[i] = new Multiview1(eval(`EN_${i+1}`),i+1);
}
function Multiview1Set(position){
    for(let i=0;i<NUM;i++){
        let port=Multiview1Inport[i];
        if(port.position===position){
            port.position = MAX;
        }
    }
}


let timer=new Array(7);  
let position=new Array(7);  

function login(){
    let status=connStatus;
    if(connStatus)
    {
        for(let i=0;i<NUM;i++)
        {
            clearTimer(i);
        }
        try{
            server_TCP.destroy();
        }catch(err){
            console.log("The error is "+err);
            alert("连接关闭失败");
            return ;
        }
        status = false;    
    }
    else
    {
        try{
            server_TCP = net_TCP.connect(parseInt(port.value),ip.value);
            server_TCP.on("connect",()=>{
                connected=true;
                server_TCP.write("require blueriver_api 3.0.0.0\r\n");
                server_TCP.write("require multiview 1.1.0\r\n");
            });
            server_TCP.on("data",(data)=>{
                console.log("The data is "+data);
            });
            status = true;
        }catch(err){
            alert("连接建立失败 "+err);
        }

        {
            server_UDP = net_UDP.createSocket("udp4");
            let data=[0x2F,0x03,0xF4,0xA2,0x01,0x00,0x00,0x00,0x00,0x00];
            data=Buffer.from(data);
            server_UDP.on("listening",()=>{
                console.log("listening ");
            });
            server_UDP.on("message",(data,reio)=>{
                console.log("the data is "+data.toString("hex"));
                console.log("the remoote info is " + reio.address);
                let mac= data.slice(10,16);
                let ip =data.slice(16,20);
                let device = new USBObj(mac,ip);
                USBInfo.push(device);
            });
            server_UDP.send(data,6137,"192.168.20.255",(err)=>{
                if(err){
                    console.log("have error"+err);
                }
                else{
                    console.log("connect good");
                }
            });
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
function clearTimer(id){
    let i;
    //for(i=0;i<timer.length;i++){
        if(timer[id])
        {
            clearInterval(timer[id]);
            timer[id]=false;
        }
    //}
}
function clearsubscript(id){
    let dim = `DE_${id}`;
    dim=eval(dim);
    for(let i=0;i<9;i++){
        serversend(`leave ${dim}:HDMI:${i}`);
    }
}
function serversend(msg){
    if(!connStatus){
        alert("请进行服务器连接");
        return ;
    }
    let info=`${msg}\r\n`;
    if(debug){
        console.log(info);
    }
    server_TCP.write(info);
}
const v_fastswitch=document.getElementById("v_set");
const Gen = "genlock";
const Fst = "fastswitch"
let switch_mode = Fst;
const switch_mode_id = document.getElementById("switch");
switch_mode_id.addEventListener("change",(value)=>{
    switch_mode=switch_mode_id.value;
    switch(switch_mode){
        case Gen:{
            v_fastswitch.setAttribute("hidden",true);
            break;
        }
        default:{
            v_fastswitch.removeAttribute("hidden");
            break;
        }  
    }
});

let v_input =EN_1;
const v_input_id = document.getElementById("v_input");
v_input_id.addEventListener("change",(value)=>{
    v_input=eval("EN_"+v_input_id.value);
});
let v_output =DE_1;
const v_output_id = document.getElementById("v_output");
v_output_id.addEventListener("change",(value)=>{
    console.log("the switch mode is "+v_output_id.value);
    if(parseInt(v_output_id.value)){
        v_output=eval("DE_"+v_output_id.value);    
    }
    else{
        v_output="ALL_RX";
    } 
});
let v_res ="1920 1080";
const v_res_id =document.getElementById("v_out_res");
v_res_id.addEventListener("change",()=>{
    v_res=v_res_id.value;
});
let v_fps ="60";
const v_fps_id =document.getElementById("v_out_fs");
v_fps_id.addEventListener("change",()=>{
    v_fps=v_fps_id.value;
});
const v_switch_f =document.getElementById("v_switch_btn");
v_switch_f.addEventListener("click",()=>{
    let str=""
    switch(switch_mode){
        case "genlock":{
            str=`join ${v_input}:HDMI:0 ${v_output}:0 ${switch_mode}`;
            break;
        }
        case "fastswitch":{
            str=`join ${v_input}:HDMI:0 ${v_output}:0 ${switch_mode} size ${v_res} fps ${v_fps}`;
            break;
        }
    }
    serversend(str);
})


const WGen = "wall";
const WFast = "wall_fs";
let wall_mode = "wall_fs";
let wallnum = 4;
let wall_h = 2;
let wall_w = 2;
let wall_position = 1;
let wall_switch_mode = Gen;
let wall_input = EN_1;
let wall_input_res ="1920 1080";

let wall_output = DE_1;
let wall_output_res = "1920 1080";
let wall_output_fps = 60;
let wall_border_left = 0;
let wall_border_top = 0;
let wall_border_right = 0;
let wall_border_bottom = 0;
let wall_res_w = 1920;
let wall_res_h = 1080 ;
let wall_more = false ;
const wall=document.getElementById("videowall");
const wall_mode_h=document.getElementById("wall_mode_h");
const wall_mode_w=document.getElementById("wall_mode_w");
const wall_positon_id =document.getElementById("wall_position");
const wall_mode_id=document.getElementById("wall_switch");
const wall_input_id = document.getElementById("wall_input");
const wall_res_w_id =document.getElementById("wall_res_H");
const wall_res_h_id =document.getElementById("wall_res_V");
const wall_output_id =document.getElementById("wall_output");
const wall_output_res_id =document.getElementById("wall_out_res");
const wall_output_fps_id = document.getElementById("wall_out_fs");
const wall_set_btn = document.getElementById("wall_btn");
const wall_switch_btn = document.getElementById("wall_switch_btn");
const wall_borden_btn = document.getElementById("wall_borden_btn");
const left_id = document.getElementById("left");
const right_id = document.getElementById("right");
const top_id = document.getElementById("top");
const bottom_id = document.getElementById("bottom");



wall_res_w_id.addEventListener("change",()=>{
    if(parseInt(wall_res_w_id.value)>4096)
    {
        wall_res_w_id.value=4096;
    }
    wall_res_w =parseInt(wall_res_w_id.value);
});
wall_res_h_id.addEventListener("change",()=>{
    if(parseInt(wall_res_h_id.value)>2160)
    {
        wall_res_h_id.value=2160;
    }
    wall_res_h =parseInt(wall_res_h_id.value);
});

left_id.addEventListener("change",()=>{
    wall_border_left =parseInt(left_id.value);
});
right_id.addEventListener("change",()=>{
    wall_border_right =parseInt(right_id.value);
});
top_id.addEventListener("change",()=>{
    wall_border_top = parseInt(top_id.value);
});
bottom_id.addEventListener("change",()=>{
    wall_border_bottom = parseInt(bottom_id.value);
})
wall_set_btn.addEventListener("click",()=>{
    let str="";
    {
        let num =parseInt(wall_output_id.value)-1;
        woutport[num].SetPosition(wall_position);
        str=SetVideoWall(wall_output,wall_position)    
    }
    serversend(str);
});
wall_switch_btn.addEventListener("click",()=>{
    let str="";
    {
        let value=[]
        for(let i=0;i<NUM;i++)
        {
            let port=woutport[i];
            if(port.position<=wallnum)
            {
                value.push(port.CreatMommand(port.id,port.position));
            }
        }
        str=value.join("\r\n");
    }
    serversend(str);
});
wall_borden_btn.addEventListener("click",()=>{
    let str="";
    {
        let value=[]
        for(let i=0;i<NUM;i++)
        {
            let port=woutport[i];
            if(port.position<=wallnum)
            {
                value.push(port.CreatMommand(port.id,port.position));
            }
        }
        str=value.join("\r\n");
    }
    serversend(str);
});
function SetVideoWall(outport,position){
    let str;
    let id=position-1;
    let row = Math.floor(id/wall_w);
    let col = id%wall_w
    let border_w=(wall_border_left+wall_border_right);
    let border_h=(wall_border_top+wall_border_bottom);
    let keep_W,keep_H;
    keep_W=Math.floor((wall_res_w-(wall_h-1)*border_w)/wall_h);
    keep_H=Math.floor((wall_res_h-(wall_w-1)*border_h)/wall_w);
    keep_W=(keep_W%2==0)?keep_W:keep_W+1;
    keep_H=(keep_H%2==0)?keep_H:keep_H+1;
    offset_W=(((keep_W+border_w)*(col))%2==0)?(keep_W+border_w)*(col):(keep_W+border_w)*(col)+1;
    offset_H=(((keep_H+border_h)*(row))%2==0)?(keep_H+border_h)*(row):(keep_H+border_h)*(row)+1;
    if(wall_mode === WGen)
    {
        str=`join ${wall_input}:HDMI:0 ${outport}:0 ${wall_mode} size ${wall_output_res} keep ${keep_W} ${keep_H} offset ${offset_W} ${offset_H} fps ${wall_output_fps}`;
    }else{
        str=`join ${wall_input}:HDMI:0 ${outport}:0 ${wall_mode} size ${wall_output_res} keep ${keep_W} ${keep_H} offset ${offset_W} ${offset_H}  fps ${wall_output_fps}`;
    }
    return str;
}
wall_output_fps_id.addEventListener("change",()=>{
    wall_output_fps = wall_output_fps_id.value;
});
/* 
wall_output_res_id.addEventListener("change",()=>{
    wall_output_res=wall_output_res.value;
});
*/
wall_output_id.addEventListener("change",()=>{
    wall_output=eval("DE_"+wall_output_id.value);
});
wall_input_id.addEventListener("change",()=>{
    wall_input=eval("EN_"+wall_input_id.value);
});
/*
wall_input_res_id.addEventListener("change",()=>{
    wall_input_res=wall_input_res_id.value;
    GetInputRes();
})
*/

wall_positon_id.addEventListener("change",GetPosition);
wall_mode_id.addEventListener("change",()=>{
    wall_mode = wall_mode_id.value;
    console.log(wall_mode);
    WallfpsRender();
});
const wallset=document.getElementById("wall_set");
function WallfpsRender(){
    if(wall_mode===WGen){
        wallset.setAttribute("hidden",true);  
    }
    else{
        wallset.removeAttribute("hidden");
    }
}
function GetInputRes(){
    let res = wall_input_res.split(" ");
    wall_res_w = Math.floor(parseInt(res[0]));
    wall_res_h = Math.floor(parseInt(res[1]));
    console.log(`w is ${wall_res_w} h is ${wall_res_h}`);
}
function GetPosition(){
    console.log("the position have change");
    wall_position=parseInt(wall_positon_id.value);
}
function render_wall(){
    let num=1;
    let str="";
    let str1="";
    for(let i=0;i<wall_h;i++){
        str+=`<tr>`;
        for(let n=0;n<wall_w;n++){
            str+=`<td><p style="width:20px;margin:auto">${num++}</p></td>`
        }
        str+=`</tr>`
    }
    wallnum = num-1;
    if(wall_position>wallnum){
        wall_position = 1;
    }
    for(let i=0;i<wallnum;i++){
        let data=i+1;
        if(data==wall_position){
            str1+=`<option value=${data.toString()} selected>${data}</option>`;
        }
        else
        {
            str1+=`<option value=${data.toString()} >${data}</option>`;
        }
    }
    wall.innerHTML=str;
    wall_positon_id.innerHTML=str1;
    GetInputRes();    
}
wall_mode_w.addEventListener("change",()=>{
    wall_w = wall_mode_w.value;
    render_wall();
});
wall_mode_h.addEventListener("change",()=>{
    wall_h = wall_mode_h.value;
    render_wall();
});







let Multiview1_mode = "Multiview";

let Multiview1num = 4;
let Multiview1_w_num = 2;
let Multiview1_h_num = 2;
let Multiview1_position = 1;
let Multiview1_input = EN_1;
let Multiview1_output = DE_1;
let Multiview1_output_res = "1920 1080";
let Multiview1_output_fps = 60;

let Multiview1_res_w = 1920;
let Multiview1_res_h = 1080 ;



const Multiview1_position_id =document.getElementById("Multiview1_position");
const Multiview1_input_id = document.getElementById("Multiview1_input");
const Multiview1_output_id =document.getElementById("Multiview1_output");
const Multiview1_output_res_id =document.getElementById("Multiview1_output_res");
const Multiview1_output_fps_id = document.getElementById("Multiview1_output_fps");
const Multiview1_set_btn = document.getElementById("Multiview1_btn");
const Multiview1_setect_set_btn = document.getElementById("Multiview1_setect_btn");

Multiview1_setect_set_btn.addEventListener("click",()=>{
    let str="";
    let value=[];
    {
        
        let num =parseInt(Multiview1_input_id.value)-1;
        Multiview1Inport[num].SetMultiview1Position(Multiview1_position);
        let port=Multiview1Inport[num];
        value.push(port.CreatMultiview1Mommand());
    }
    serversend(str);
});
const MulVideo_res_w = 3840;
const MulVideo_res_h = 2160;
Multiview1_set_btn.addEventListener("click",()=>{
    let str="";
    clearTimer(Multiview1_output_id.value-1);
    let Mul_size_w=MulVideo_res_w/Multiview1_w_num; //lie
    let Mul_size_h=MulVideo_res_h/Multiview1_h_num; //hang

    let n,m;
    serversend(`layout pip_MxN create size 3840 2160`);
    for(m=0;m<Multiview1_h_num;m++) //创建 layout 
    {
        for(n=0;n<Multiview1_w_num;n++)
        {
            serversend(`layout pip_MxN window ${m*Multiview1_w_num+n} position ${n*Mul_size_w}  ${m*Mul_size_h}  size  ${Mul_size_w} ${Mul_size_h} target ${m*Multiview1_w_num+n}`);
        }

    }
    {
        let value=[]
        for(let i=0;i<NUM;i++)
        {
            let port=Multiview1Inport[i];
            if(port.position<=Multiview1num)
            {
                value.push(port.CreatMultiview1Mommand());
            }
        }
        str=value.join("\r\n");
    }
    serversend(str);
});

function SetMultiview1(inputid,position,flag){
    let Mul_size_w=MulVideo_res_w/Multiview1_w_num; //lie
    let Mul_size_h=MulVideo_res_h/Multiview1_h_num; //hang
    clearTimer(Multiview1_output_id.value-1);
    serversend(`start ${inputid}:HDMI:1`);
    serversend(`set ${inputid} scaler size ${Mul_size_w} ${Mul_size_h}`);
    serversend(`set ${inputid} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);
    serversend(`set ${Multiview1_output} multiview pip_MxN fps ${Multiview1_output_fps} size ${Multiview1_res_w} ${Multiview1_res_h} `);
    serversend(`join ${inputid}:HDMI:1 ${Multiview1_output}:${position-1}`);
    
}


Multiview1_output_fps_id.addEventListener("change",()=>{
    Multiview1_output_fps = Multiview1_output_fps_id.value;
});
Multiview1_output_res_id.addEventListener("change",()=>{
    Multiview1_output_res=Multiview1_output_res_id.value;
    GetMultiview1OutputRes();
});

Multiview1_output_id.addEventListener("change",()=>{
    Multiview1_output=eval("DE_"+Multiview1_output_id.value);
});

Multiview1_input_id.addEventListener("change",()=>{
    Multiview1_input=eval("EN_"+Multiview1_input_id.value);
});
Multiview1_position_id.addEventListener("change",GetMultiview1Position);
function GetMultiviewPosition(){
    console.log("the position have change");
    Multiview1_position=parseInt(Multiview1_position_id.value);
}
function GetMultiview1Position(){
    console.log("the position have change");
    Multiview1_position=parseInt(Multiview1_position_id.value);
}
function GetMultiview1OutputRes(){
    let res = Multiview1_output_res.split(" ");
    Multiview1_res_w = Math.floor(parseInt(res[0]));
    Multiview1_res_h = Math.floor(parseInt(res[1]));
}




let Multiview2_src1_posi_H = 0;
let Multiview2_src1_posi_V = 0;
let Multiview2_src2_posi_H = 0;
let Multiview2_src2_posi_V = 0;

let Multiview2_src1_res_H = 1920;
let Multiview2_src1_res_V = 1080 ;
let Multiview2_src2_res_H = 1920;
let Multiview2_src2_res_V = 1080 

let Multiview2_input1 = EN_1;
let Multiview2_input2 = EN_2;
let Multiview2_output = DE_1;

let Multiview2_output_res = "1920 1080";
let Multiview2_output_fps = 60;


let Multiview2_res_w = 1920;
let Multiview2_res_h = 1080;

const Multiview2_src1_posi_H_id =document.getElementById("Multiview2_src1_posi_H");
const Multiview2_src1_posi_V_id =document.getElementById("Multiview2_src1_posi_V");
const Multiview2_src2_posi_H_id =document.getElementById("Multiview2_src2_posi_H");
const Multiview2_src2_posi_V_id =document.getElementById("Multiview2_src2_posi_V");
const Multiview2_src1_res_H_id =document.getElementById("Multiview2_src1_res_H");
const Multiview2_src1_res_V_id =document.getElementById("Multiview2_src1_res_V");
const Multiview2_src2_res_H_id =document.getElementById("Multiview2_src2_res_H");
const Multiview2_src2_res_V_id =document.getElementById("Multiview2_src2_res_V");

const Multiview2_input1_id = document.getElementById("Multiview2_input1");
const Multiview2_input2_id = document.getElementById("Multiview2_input2");
const Multiview2_output_id =document.getElementById("Multiview2_output");

const Multiview2_output_res_id =document.getElementById("Multiview2_output_res");
const Multiview2_output_fps_id = document.getElementById("Multiview2_output_fps");

const Multiview2_set_setect_btn1 = document.getElementById("Multiview2_setect_btn1");
const Multiview2_set_setect_btn2 = document.getElementById("Multiview2_setect_btn2");
const Multiview2_set_btn = document.getElementById("Multiview2_btn");


Multiview2_src1_posi_H_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src1_posi_H_id.value)>4096)
    {
        Multiview2_src1_posi_H_id.value=4096;
    }
    
    if(parseInt(Multiview2_src1_posi_H_id.value)>Multiview2_res_w)
    {
        Multiview2_src1_posi_H_id.value=Multiview2_res_w;
    }
    
    Multiview2_src1_posi_H_id.value=(Multiview2_src1_posi_H_id.value%2==0)?(Multiview2_src1_posi_H_id.value):(Multiview2_src1_posi_H_id.value)+1;

    Multiview2_src1_posi_H =parseInt(Multiview2_src1_posi_H_id.value);
});
Multiview2_src1_posi_V_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src1_posi_V_id.value)>2160)
    {
        Multiview2_src1_posi_V_id.value=2160;
    }
    
    if(parseInt(Multiview2_src1_posi_V_id.value)>Multiview2_res_w)
    {
        Multiview2_src1_posi_V_id.value=Multiview2_res_w;
    }
     
    Multiview2_src1_posi_V_id.value=(Multiview2_src1_posi_V_id.value%2==0)?(Multiview2_src1_posi_V_id.value):(Multiview2_src1_posi_V_id.value)+1;

    Multiview2_src1_posi_V =parseInt(Multiview2_src1_posi_V_id.value);

});
Multiview2_src2_posi_H_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src2_posi_H_id.value)>4096)
    {
        Multiview2_src2_posi_H_id.value=4096;
    }
    
    if(parseInt(Multiview2_src2_posi_H_id.value)>Multiview2_res_w)
    {
        Multiview2_src2_posi_H_id.value=Multiview2_res_w;
    }
    Multiview2_src2_posi_H_id.value=(Multiview2_src2_posi_H_id.value%2==0)?(Multiview2_src2_posi_H_id.value):(Multiview2_src2_posi_H_id.value)+1;

    Multiview2_src2_posi_H =parseInt(Multiview2_src2_posi_H_id.value);
});
Multiview2_src2_posi_V_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src2_posi_V_id.value)>2160)
    {
        Multiview2_src2_posi_V_id.value=2160;
    }
    
    if(parseInt(Multiview2_src2_posi_V_id.value)>Multiview2_res_w)
    {
        Multiview2_src2_posi_V_id.value=Multiview2_res_w;
    }
     
    Multiview2_src2_posi_V_id.value=(Multiview2_src2_posi_V_id.value%2==0)?(Multiview2_src2_posi_V_id.value):(Multiview2_src2_posi_V_id.value)+1;

    Multiview2_src2_posi_V =parseInt(Multiview2_src2_posi_V_id.value);
});

Multiview2_src1_res_H_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src1_res_H_id.value)>4096)
    {
        Multiview2_src1_res_H_id.value=4096;
    }
    
    if(parseInt(Multiview2_src1_res_H_id.value)>Multiview2_res_w)
    {
        Multiview2_src1_res_H_id.value=Multiview2_res_w;
    }
     
    Multiview2_src1_res_H_id.value=(Multiview2_src1_res_H_id.value%2==0)?(Multiview2_src1_res_H_id.value):(Multiview2_src1_res_H_id.value)+1;

    Multiview2_src1_res_H =parseInt(Multiview2_src1_res_H_id.value);
});
Multiview2_src1_res_V_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src1_res_V_id.value)>2160)
    {
        Multiview2_src1_res_V_id.value=2160;
    }
    if(parseInt(Multiview2_src1_res_V_id.value)>Multiview2_res_w)
    {
        Multiview2_src1_res_V_id.value=Multiview2_res_w;
    }
    
    Multiview2_src1_res_V_id.value=(Multiview2_src1_res_V_id.value%2==0)?(Multiview2_src1_res_V_id.value):(Multiview2_src1_res_V_id.value)+1;

    Multiview2_src1_res_V =parseInt(Multiview2_src1_res_V_id.value);
});
Multiview2_src2_res_H_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src2_res_H_id.value)>4096)
    {
        Multiview2_src2_res_H_id.value=4096;
    }
    
    if(parseInt(Multiview2_src2_res_H_id.value)>Multiview2_res_w)
    {
        Multiview2_src2_res_H_id.value=Multiview2_res_w;
    }
    
    Multiview2_src2_res_H_id.value=(Multiview2_src2_res_H_id.value%2==0)?(Multiview2_src2_res_H_id.value):(Multiview2_src2_res_H_id.value)+1;

    Multiview2_src2_res_H =parseInt(Multiview2_src2_res_H_id.value);
});
Multiview2_src2_res_V_id.addEventListener("change",()=>{
    if(parseInt(Multiview2_src2_res_V_id.value)>2160)
    {
        Multiview2_src2_res_V_id.value=2160;
    }
    
    if(parseInt(Multiview2_src2_res_V.value)>Multiview2_res_w)
    {
        Multiview2_src2_res_V.value=Multiview2_res_w;
    }
    
    Multiview2_src2_res_V.value=(Multiview2_src2_res_V.value%2==0)?(Multiview2_src2_res_V.value):(Multiview2_src2_res_V.value)+1;

    Multiview2_src2_res_V =parseInt(Multiview2_src2_res_V_id.value);
});


Multiview2_set_setect_btn1.addEventListener("click",()=>{
    Multiview2_src1_posi_H =parseInt(Multiview2_src1_posi_H_id.value);
    Multiview2_src1_posi_V =parseInt(Multiview2_src1_posi_V_id.value);
    Multiview2_src1_res_H =parseInt(Multiview2_src1_res_H_id.value);
    Multiview2_src1_res_V =parseInt(Multiview2_src1_res_V_id.value);
    serversend(`layout pip_2 window 0 position ${Multiview2_src1_posi_H}  ${Multiview2_src1_posi_V}  size  ${Multiview2_src1_res_H} ${Multiview2_src1_res_V} target 0`);
    serversend(`set ${Multiview2_input1} scaler size ${Multiview2_src1_res_H} ${Multiview2_src1_res_V}`);
    serversend(`set ${Multiview2_input1} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);
    serversend(`set ${Multiview2_output} multiview pip_2 fps ${Multiview2_output_fps} size ${Multiview2_res_w} ${Multiview2_res_h} `)
    serversend(`join ${Multiview2_input1}:HDMI:1 ${Multiview2_output}:0`);

});

Multiview2_set_setect_btn2.addEventListener("click",()=>{
    Multiview2_src2_posi_H =parseInt(Multiview2_src2_posi_H_id.value);
    Multiview2_src2_posi_V =parseInt(Multiview2_src2_posi_V_id.value);
    Multiview2_src2_res_H =parseInt(Multiview2_src2_res_H_id.value);
    Multiview2_src2_res_V =parseInt(Multiview2_src2_res_V_id.value);

    serversend(`layout pip_2 window 1 position ${Multiview2_src2_posi_H}  ${Multiview2_src2_posi_V}  size  ${Multiview2_src2_res_H} ${Multiview2_src2_res_V} target 1`);
    serversend(`set ${Multiview2_input2} scaler size ${Multiview2_src2_res_H} ${Multiview2_src2_res_V}`);
    serversend(`set ${Multiview2_input2} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);
    serversend(`set ${Multiview2_output} multiview pip_2 fps ${Multiview2_output_fps} size ${Multiview2_res_w} ${Multiview2_res_h} `)
    serversend(`join ${Multiview2_input2}:HDMI:1 ${Multiview2_output}:1`);
});

function SetMultiview2(){
    let n,m;

    clearTimer(Multiview2_output_id.value-1);
    serversend(`layout pip_2 create size ${Multiview2_res_w} ${Multiview2_res_h}`);
    serversend(`layout pip_2 window 0 position ${Multiview2_src1_posi_H}  ${Multiview2_src1_posi_V}  size  ${Multiview2_src1_res_H} ${Multiview2_src1_res_V} target 0`);
    serversend(`layout pip_2 window 1 position ${Multiview2_src2_posi_H}  ${Multiview2_src2_posi_V}  size  ${Multiview2_src2_res_H} ${Multiview2_src2_res_V} target 1`);
//开启流
    serversend(`start ${Multiview2_input1}:HDMI:1`);
    serversend(`start ${Multiview2_input2}:HDMI:1`);
    serversend(`set ${Multiview2_input1} scaler size ${Multiview2_src1_res_H} ${Multiview2_src1_res_V}`);
    serversend(`set ${Multiview2_input1} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);

    serversend(`set ${Multiview2_input2} scaler size ${Multiview2_src2_res_H} ${Multiview2_src2_res_V}`);
    serversend(`set ${Multiview2_input2} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);

    serversend(`set ${Multiview2_output} multiview pip_2 fps ${Multiview2_output_fps} size ${Multiview2_res_w} ${Multiview2_res_h} `)
    serversend(`join ${Multiview2_input1}:HDMI:1 ${Multiview2_output}:0`);
    serversend(`join ${Multiview2_input2}:HDMI:1 ${Multiview2_output}:1`);
    
}
Multiview2_set_btn.addEventListener("click",()=>{
    SetMultiview2();
});

Multiview2_output_fps_id.addEventListener("change",()=>{
    Multiview2_output_fps = Multiview2_output_fps_id.value;
});
Multiview2_output_res_id.addEventListener("change",()=>{
    Multiview2_output_res=Multiview2_output_res_id.value;
    GetMultiview2OutputRes();
});

Multiview2_output_id.addEventListener("change",()=>{
    Multiview2_output=eval("DE_"+Multiview2_output_id.value);
});

Multiview2_input1_id.addEventListener("change",()=>{
    Multiview2_input1=eval("EN_"+Multiview2_input1_id.value);
});
Multiview2_input2_id.addEventListener("change",()=>{
    Multiview2_input2=eval("EN_"+Multiview2_input2_id.value);
});
function GetMultiview2OutputRes(){
    let res = Multiview2_output_res.split(" ");
    Multiview2_res_w = Math.floor(parseInt(res[0]));
    Multiview2_res_h = Math.floor(parseInt(res[1]));
}




let Multiview3_src1_res_H = 1920;
let Multiview3_src1_res_V = 1080;

let Multiview3_input1 = EN_1;
let Multiview3_input2 = EN_2;
let Multiview3_output = DE_1;

let Multiview3_output_res = "1920 1080";
let Multiview3_output_fps = 60;


let Multiview3_res_w = 1920;
let Multiview3_res_h = 1080;


const Multiview3_src1_res_H_id =document.getElementById("Multiview3_src1_res_H");
const Multiview3_src1_res_V_id =document.getElementById("Multiview3_src1_res_V");

const Multiview3_input1_id = document.getElementById("Multiview3_input1");
const Multiview3_input2_id = document.getElementById("Multiview3_input2");
const Multiview3_output_id =document.getElementById("Multiview3_output");

const Multiview3_output_res_id =document.getElementById("Multiview3_output_res");
const Multiview3_output_fps_id = document.getElementById("Multiview3_output_fps");

const Multiview3_set_setect_btn1 = document.getElementById("Multiview3_setect_btn1");
const Multiview3_set_setect_btn2 = document.getElementById("Multiview3_setect_btn2");
const Multiview3_set_setect_btn3 = document.getElementById("Multiview3_setect_btn3");

const Multiview3_set_btn = document.getElementById("Multiview3_btn");



Multiview3_src1_res_H_id.addEventListener("change",()=>{
    if(parseInt(Multiview3_src1_res_H_id.value)>4096)
    {
        Multiview3_src1_res_H_id.value=4096;
    }
    if(parseInt(Multiview3_src1_res_H_id.value)>Multiview3_res_w)
    {
        Multiview3_src1_res_H_id.value=Multiview3_res_w;
    }
    Multiview3_src1_res_H_id.value=(Multiview3_src1_res_H_id.value%2==0)?(Multiview3_src1_res_H_id.value):(Multiview3_src1_res_H_id.value)+1;
    Multiview3_src1_res_H =parseInt(Multiview3_src1_res_H_id.value);
});
Multiview3_src1_res_V_id.addEventListener("change",()=>{
    if(parseInt(Multiview3_src1_res_V_id.value)>2160)
    {
        Multiview3_src1_res_V_id.value=2160;
    }
    if(parseInt(Multiview3_src1_res_V_id.value)>Multiview3_res_w)
    {
        Multiview3_src1_res_V_id.value=Multiview3_res_w;
    }
    Multiview3_src1_res_V_id.value=(Multiview3_src1_res_V_id.value%2==0)?(Multiview3_src1_res_V_id.value):(Multiview3_src1_res_V_id.value)+1;
    Multiview3_src1_res_V =parseInt(Multiview3_src1_res_V_id.value);
});



Multiview3_set_setect_btn1.addEventListener("click",()=>{

    serversend(`layout pip_circle window 0 position 0  ${Multiview3_src1_res_V/2}  size  ${Multiview3_src1_res_H} ${Multiview3_src1_res_V} target 0`);
    serversend(`set ${Multiview3_input1} scaler size ${Multiview3_src1_res_H} ${Multiview3_src1_res_V}`);
    serversend(`set ${Multiview3_input1} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);
    serversend(`set ${Multiview3_output} multiview pip_circle fps ${Multiview3_output_fps} size ${Multiview3_res_w} ${Multiview3_res_h} `);
    serversend(`join ${Multiview3_input1}:HDMI:1 ${Multiview3_output}:0`);

});

Multiview3_set_setect_btn2.addEventListener("click",()=>{
    serversend(`set ${Multiview3_input2} scaler size ${Multiview3_res_w} ${Multiview3_res_h}`);
    serversend(`set ${Multiview3_input2} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);
    serversend(`set ${Multiview3_output} multiview pip_circle fps ${Multiview3_output_fps} size ${Multiview3_res_w} ${Multiview3_res_h} `);
    serversend(`join ${Multiview3_input2}:HDMI:1 ${Multiview3_output}:1`);
});

Multiview3_set_setect_btn3.addEventListener("click",()=>{
    
    for(let i=0;i<NUM;i++)
    {
        clearTimer(i);
    }
});


function SetMultiview3(){
    let n,m;

    serversend(`layout pip_circle create size ${Multiview3_res_w} ${Multiview3_res_h}`);
    serversend(`layout pip_circle window 0 position 0  ${Multiview3_src1_res_V/2}  size  ${Multiview3_src1_res_H} ${Multiview3_src1_res_V} target 0`);
    serversend(`layout pip_circle window 1 position 0  0 size  ${Multiview3_res_w} ${Multiview3_res_h} target 1`);
    //开启流
    serversend(`start ${Multiview3_input1}:HDMI:1`);
    serversend(`start ${Multiview3_input2}:HDMI:1`);
    serversend(`set ${Multiview3_input1} scaler size ${Multiview3_src1_res_H} ${Multiview3_src1_res_V}`);
    serversend(`set ${Multiview3_input1} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);

    serversend(`set ${Multiview3_input2} scaler size ${Multiview3_res_w} ${Multiview3_res_h}`);
    serversend(`set ${Multiview3_input2} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1`);


    serversend(`set ${Multiview3_output} multiview pip_circle fps ${Multiview3_output_fps} size ${Multiview3_res_w} ${Multiview3_res_h} `);
    serversend(`join ${Multiview3_input1}:HDMI:1 ${Multiview3_output}:0`);
    serversend(`join ${Multiview3_input2}:HDMI:1 ${Multiview3_output}:1`);

    position[Multiview3_output_id.value-1]=0;
    if(timer[Multiview3_output_id.value-1])
    {
        clearImmediate(timer[Multiview3_output_id.value-1]);
    }
    timer[Multiview3_output_id.value-1]=setInterval(mycircle,1000,Multiview3_output_id.value);
    
}



function mycircle(id){

    let layout="pip_circle";
    let x,y;
    let value= position[id-1];
    value=(value+2)%360;
    position[id-1]=value;

    x=Math.floor((Multiview3_res_w-Multiview3_src1_res_H)/2+Math.cos(value*2*Math.PI/360)*(Multiview3_res_h-Multiview3_src1_res_V)/2);
    y=Math.floor((Multiview3_res_h-Multiview3_src1_res_V)/2-Math.sin(value*2*Math.PI/360)*(Multiview3_res_h-Multiview3_src1_res_V)/2);
    if(x%2)
    {
        x-=1;
    }
    if(y%2)
    {
        y-=1;
    }

    serversend(`layout ${layout} window 0 position ${x} ${y} size  ${Multiview3_src1_res_H} ${Multiview3_src1_res_V} target 0`);
    serversend(`set ${Multiview3_output} multiview pip_circle fps ${Multiview3_output_fps} size ${Multiview3_res_w} ${Multiview3_res_h} `);
    
}


Multiview3_set_btn.addEventListener("click",()=>{
    SetMultiview3();
});

Multiview3_output_fps_id.addEventListener("change",()=>{
    Multiview3_output_fps = Multiview3_output_fps_id.value;
});
Multiview3_output_res_id.addEventListener("change",()=>{
    Multiview3_output_res=Multiview3_output_res_id.value;
    GetMultiview3OutputRes();
});

Multiview3_output_id.addEventListener("change",()=>{
    Multiview3_output=eval("DE_"+Multiview3_output_id.value);
});

Multiview3_input1_id.addEventListener("change",()=>{
    Multiview3_input1=eval("EN_"+Multiview3_input1_id.value);
});
Multiview3_input2_id.addEventListener("change",()=>{
    Multiview3_input2=eval("EN_"+Multiview3_input2_id.value);
});
function GetMultiview3OutputRes(){
    let res = Multiview3_output_res.split(" ");
    Multiview3_res_w = Math.floor(parseInt(res[0]));
    Multiview3_res_h = Math.floor(parseInt(res[1]));
}




let KVM_input =EN_1;
const KVM_input_id = document.getElementById("KVM_input");
KVM_input_id.addEventListener("change",(value)=>{
    KVM_input=eval("EN_"+KVM_input_id.value);
});
let KVM_output =DE_1;
const KVM_output_id = document.getElementById("KVM_output");
KVM_output_id.addEventListener("change",(value)=>{

    KVM_output=eval("DE_"+KVM_output_id.value);    
});

const KVM_switch_btn_id =document.getElementById("KVM_switch_btn");
KVM_switch_btn_id.addEventListener("click",()=>{
    let i=0,de_obj_num,en_obj_num;
    for(i=0;i<5;i++)
    {
        if(USBInfo[i].device_mac == KVM_input)
        {
            en_obj_num=i;
        }
        
        if(USBInfo[i].device_mac == KVM_output)
        {
            de_obj_num=i;
        }

    }
    USBInfo[en_obj_num].PairDevice(USBInfo[de_obj_num].MAC);
    USBInfo[de_obj_num].PairDevice(USBInfo[en_obj_num].MAC);

})



//===================================================================================


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
    server_TCP.write(info);
    info=`layout pip_9x720 window 0 position 0 0 size 1280 720 target 0\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 1 position 1280 0 size 1280 720 target 1\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 2 position 2560 0 size 1280 720 target 2\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 3 position 0 720 size 1280 720 target 3\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 4 position 1280 720 size 1280 720 target 4\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 5 position 2560  720 size 1280 720 target 5\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 6 position 0 1440 size 1280 720 target 6\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 7 position 1280 1440 size 1280 720 target 7\r\n`;
    server_TCP.write(info);
    info=`layout pip_9x720 window 8 position 2560 1440 size 1280 720 target 8\r\n`;
    server_TCP.write(info);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`start ${dim}:HDMI:1\r\n`;
        server_TCP.write(info);
        info=`set ${dim} scaler size 1280 720\r\n`;
        server_TCP.write(info);
        info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
        server_TCP.write(info);
    }
    info = `set ${val} multiview pip_9x720 fps ${out4K} \r\n`;
    server_TCP.write(info);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`join ${dim}:HDMI:1 ${val}:${i}\r\n`;
        console.log(info);
        server_TCP.write(info);
        info=`join ${dim}:HDMI:0 ${val}:${i+4}\r\n`;
        console.log(info);
        server_TCP.write(info);
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
    server_TCP.write(info);
    info=`layout pap window 0 position 200 200 size 1920 1080 target 0\r\n`;
    server_TCP.write(info);
    info=`layout pap window 1 position 1920 1080 size 1920 1080 target 1\r\n`;
    server_TCP.write(info);
    
    for(let i=0;i<2;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`start ${dim}:HDMI:1\r\n`;
        server_TCP.write(info);
        info=`set ${dim} scaler size 1920 1080\r\n`;
        server_TCP.write(info);
        info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
        server_TCP.write(info);
    }
    info = `set ${val} multiview pap fps ${out4K} \r\n`;
    server_TCP.write(info);
    for(let i=0;i<2;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`join ${dim}:HDMI:1 ${val}:${i}\r\n`;
        console.log(info);
        server_TCP.write(info);
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
    server_TCP.write(info);
    info=`layout mul_pip_1a5 window 0 position 1280 720 size 2560 1440 target 0\r\n`;
    server_TCP.write(info);
    info=`layout mul_pip_1a5 window 1 position 0 0 size 1280 720 target 1\r\n`;
    server_TCP.write(info);
    info=`layout mul_pip_1a5 window 2 position 1280 0 size 1280 720 target 2\r\n`;
    server_TCP.write(info);
    info=`layout mul_pip_1a5 window 3 position 2560 0 size 1280 720 target 3\r\n`;
    server_TCP.write(info);
    info=`layout mul_pip_1a5 window 4 position 0 720 size 1280 720 target 4\r\n`;
    server_TCP.write(info);
    info=`layout mul_pip_1a5 window 5 position 0  1440 size 1280 720 target 5\r\n`;
    server_TCP.write(info);

    info=`set ${val1} scaler size 2560 1440\r\n`;
    server_TCP.write(info);
    info = `set ${val1} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
    server_TCP.write(info);
    info = `set ${val1} property  streams[HDMI:0].configuration.source.value 1\r\n`;
    server_TCP.write(info); 

    for(let i=1;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`start ${dim}:HDMI:1\r\n`;
        server_TCP.write(info);
        info=`set ${dim} scaler size 1280 720\r\n`;
        server_TCP.write(info);
        info = `set ${dim} property  nodes[SCALER:0].inputs[main:0].configuration.source.value 1\r\n`;
        server_TCP.write(info);
        info = `set ${dim} property  streams[HDMI:0].configuration.source.value 1\r\n`;
        server_TCP.write(info); 
    }
    info = `set ${val} multiview mul_pip_1a5 fps ${out4K} \r\n`;
    server_TCP.write(info);
    for(let i=0;i<4;i++){
        let dim=i+1;
        dim=`EN_${dim}`;
        dim=eval(dim);
        info=`join ${dim}:HDMI:0 ${val}:${i+1}\r\n`;
        server_TCP.write(info);
        if(i==0)
        {
            info=`join ${dim}:HDMI:1 ${val}:0\r\n`;
            server_TCP.write(info);
        }
        if(i==3)
        {
            info=`join ${dim}:HDMI:1 ${val}:5\r\n`;
            server_TCP.write(info);
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
    server_TCP.write(info);
    info=`join ${val}:HDMI:1 ${val1}:0\r\n`;
    console.log(info);
    server_TCP.write(info);


}