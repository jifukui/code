var udp = require("dgram");
var Server = udp.createSocket("udp4");
let flag=false;
const datalength= 8;
let num1 = 320*180*2;
let pool = Buffer.alloc(num1,0xff,"binary");
let num2 = 320*180*datalength/2;
let img = Buffer.alloc(num2,0xff,"binary");
let num=0;
var dom = document.getElementById("guan");
var canvas = dom.getContext('2d');

Server.on("message",data=>{
	let start = Buffer.from(data.slice(16,18));
	start = start.readInt16BE(0);
	if(!flag)
	{
		if(start==0)
		{
			flag=true;
			let length =Buffer.from(data.slice(14,16));
			length = length.readInt16BE(0);
			let len=data.length;
			pool.fill(data.slice(len-length,length),start*640,(start+1)*640-1);
		}
	}else{
		if(start==0)
		{
			num++;
			// ChangeData();
		}
		let length =Buffer.from(data.slice(14,16));
		length = length.readInt16BE(0);
		let len=data.length;
		pool.fill(data.slice(len-length),start*640,(start+1)*640-1,"binary");
	}
});
function ChangeData(){
	console.time()
	for(let i = 0;i<num1/4;i++){
		let value = pool.slice(i*4,(i+1)*4);
		value = Array.from(value);
		let data = uyvy2rgb(value);
	}
	console.timeEnd();
	let data = new  Uint8ClampedArray(img,num2);
	
	data = new ImageData(data,320,180);
	canvas.putImageData(data,0,0);
}
function uyvy2rgb(val){
    let data = Buffer.alloc(datalength);
    let y = val[1];
    let u = val[0];
    let v = val[2];
    let y1 = val[3];
    let rgb=[datalength];
    rgb[0] = 1164*(y-16)+1596*(v-128);
    rgb[1] = 1164*(y-16)-391*(u-128)-813*(v-128) ;
    rgb[2] = 1164*(y-16)+2018*(u-128);
	rgb[3] = rgb[7] = 255000;
    rgb[4] = 1164*(y1-16)+1596*(v-128);
    rgb[5] = 1164*(y1-16)-391*(u-128)-813*(v-128) ;
    rgb[6] = 1164*(y1-16)+2018*(u-128);
    for(let i =0;i<8;i++){
        if(rgb[i]>255000){
            rgb[i]=255000
        }
        if(rgb[i]<0){
            rgb[i] = 0;
        }
        rgb[i]/=1000;
        data[i] = rgb[i];
    }
	return data;
}
Server.on("connect",()=>{
    console.log("The device have connect");
});
Server.bind(6972,()=>{
    Server.addMembership("224.1.1.14");
});
setInterval(ChangeData,100);