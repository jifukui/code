var udp = require("dgram");
var Server = udp.createSocket("udp4");
let flag=false;
const datalength= 8;
let num1 = 320*180*2;
let pool = Buffer.alloc(num1,0xff,"binary");
let num2 = 320*180*datalength/2;
let img =[] //Buffer.alloc(num2,0xff,"binary");
let num=0;
var dom = document.getElementById("guan");
var canvas = dom.getContext('2d');
var base = new ImageData(320,180);
var rgb1 = [];
var rgb2 = [];
var rgb3 = [];
var rgb4 = [];
var rgb5 = [];
function For1(){
	for(let i =0 ;i<256;i++){
		rgb1.push(1.164*(i-16));
	}
}
function For2(){
	for(let i =0 ;i<256;i++){
		rgb2.push(1.596*(i-128))
	}
}
function For3(){
	for(let i =0 ;i<256;i++){
		rgb3.push(0.391*(i-128))
	}
}
function For4(){
	for(let i =0 ;i<256;i++){
		rgb4.push(0.813*(i-128))
	}
}
function For5(){
	for(let i =0 ;i<256;i++){
		rgb5.push(2.018*(i-128))
	}
}
For1()
For2()
For3()
For4()
For5()
Server.on("message",data=>{
	let start =data.readInt16BE(16)//= Buffer.from(data.slice(16,18));
	//start = start.readInt16BE(0);
	if(!flag)
	{
		if(start==0)
		{
			flag=true;
			// let length =Buffer.from(data.slice(14,16));
			let length = data.readInt16BE(14);
			let len=data.length;
			// pool=[]
			pool.fill(data.slice(len-length,length),start*640,(start+1)*640-1);
			// pool.push(Array.from(data.slice(len-length,length)));
		}
	}else{
		if(start==0)
		{
			num++;
			// pool=[]
			//ji = true;
			// ChangeData();
		}
		let length=data.readInt16BE(14) //=Buffer.from(data.slice(14,16));
		//length = length.readInt16BE(14);
		let len=data.length;
		pool.fill(data.slice(len-length),start*640,(start+1)*640-1,"binary");
		// pool.push(Array.from(data.slice(len-length,length)));
	}
});
function ChangeData(){
	// console.time();
	// let value = [];
	// let value1;
	let start = 0;
	let step = 0 ;
	for(let i = 0;i<num1/4;i++){
		// let value=[];
		// value1 = pool.slice(i*4,(i+1)*4);
		// for(let n = 0;n <4;n++){
		// 	value[n] = pool[n+(i*4)]
		// }
		// value = Array.from(value);
		// uyvy2rgb(value,i);
		let u = pool[step++];
		let y = pool[step++];
		let v = pool[step++];
		let y1 = pool[step++];
		let rgb=[datalength];
		let base1 = rgb1[y];
		// let base2 = v-128;
		// let base3 = u-128;
		let res1 = rgb2[v];
		let res2 = rgb3[u];
		let res3 = rgb4[v];
		let res4 = rgb5[u];
		rgb[0] = base1+res1;
		rgb[1] = base1-res3-res2 ;
		rgb[2] = base1+res4;
		// rgb[3] = rgb[7] = 255000;
		base1 = rgb1[y1];
		rgb[4] = base1+res1;
		rgb[5] = base1-res3-res2 ;
		rgb[6] = base1+res4;
		{
			let i =0;
			for(i;i<3;i++){
				// if(rgb[i]>255000){
				// 	rgb[i]=255000
				// }
				// if(rgb[i]<0){
				// 	rgb[i] = 0;
				// }
				// rgb[i]/=1000;
				// data[i] = rgb[i];
				base.data[start+i]= rgb[i];
			}
			base.data[start+i]= 255;
			for(i =4;i<7;i++){
				// if(rgb[i]>255000){
				// 	rgb[i]=255000
				// }
				// if(rgb[i]<0){
				// 	rgb[i] = 0;
				// }
				// rgb[i]/=1000;
				base.data[start+i]= rgb[i];
			}
			base.data[start+i]= 255;
		}
		start+=8;
		// let data = uyvy2rgb(value,i);
		// for(let n = 0 ;n<datalength;n++){
		// 	base.data[i*datalength+n]= data[n];
		// }
		// img.fill(data,i*datalength,(i+1)*datalength,"binary");
		// img.push(...data);
	} 
	// console.timeEnd();
	//let data = new  Uint8ClampedArray(img,num2);
	
	//data = new ImageData(data,320,180);
	canvas.putImageData(base,0,0);
	// img=[];
	// console.timeEnd();
}
function uyvy2rgb(val,start){
	start =start*8;
    // let data =[8] //Buffer.alloc(datalength);
    let y = val[1];
    let u = val[0];
    let v = val[2];
    let y1 = val[3];
    let rgb=[datalength];
	let base1 = rgb1[y];
	// let base2 = v-128;
	// let base3 = u-128;
	let res1 = rgb2[v];
	let res2 = rgb3[u];
	let res3 = rgb4[v];
	let res4 = rgb5[u];
    rgb[0] = base1+res1;
    rgb[1] = base1-res3-res2 ;
    rgb[2] = base1+res4;
	// rgb[3] = rgb[7] = 255000;
	base1 = rgb1[y1];
    rgb[4] = base1+res1;
    rgb[5] = base1-res3-res2 ;
    rgb[6] = base1+res4;
	let i =0;
    for(i;i<3;i++){
        if(rgb[i]>255000){
            rgb[i]=255000
        }
        if(rgb[i]<0){
            rgb[i] = 0;
        }
        rgb[i]/=1000;
        // data[i] = rgb[i];
		base.data[start+i]= rgb[i];
    }
	base.data[start+i]= 255;
	for(i =4;i<7;i++){
        if(rgb[i]>255000){
            rgb[i]=255000
        }
        if(rgb[i]<0){
            rgb[i] = 0;
        }
        // rgb[i]/=1000;
        // data[i] = rgb[i];
		base.data[start+i]= rgb[i];
    }
	base.data[start+i]= 255;
	// return data;
}
Server.on("connect",()=>{
    console.log("The device have connect");
});
Server.bind(6972,()=>{
    Server.addMembership("224.1.1.22");
});
setInterval(ChangeData,50);