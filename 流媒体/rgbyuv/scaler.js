const fs = require("fs");
const stream = require("stream");
const src = fs.createReadStream("lena.yuv");
const dst = fs.createWriteStream("lena_4.yuv");

let w = 256;
let h = 256;
let srcdata = Buffer.alloc(w*h*3);
let index = 0;
let w1 = 128;
let h1 = 128;
let dstdata=[];
src.on("data",(data)=>{
    // console.log("cann read data "+data.length);
    console.log(Object.prototype.toString.call(data))
    srcdata.fill(data,index);
    if(!index){
        for(let i = 0;i<9;i++){
            console.log(data[i])
        }
    }
    index+=data.length;
    console.log(index);
});
src.on("close",()=>{
    console.log(`have end of this `+index);
    NearestNeighbor();
    // dst.close();
});
function Fill2File(val){
    // console.log(val.length)
    val = Buffer.from(val)
    dst.write(val,"binary");
}
function NearestNeighbor(){
    let wr = w/w1;
    let hr = h/h1;
    for(let i = 0;i<h1;i++){
        let y=Math.round(i*hr+0.5);
        for(let n=0;n<w1;n++){
            let x =Math.round(n*wr+0.5);
            let index = (y*w+x)*3;
            let index1 = (i*w1+n)*3;
            let val = Buffer.alloc(3);
            // dstdata[index1] = srcdata[index];
            // dstdata[index1+1] = srcdata[index+1];
            // dstdata[index1+2] = srcdata[index+2];
            val[0] = srcdata[index];
            val[1] = srcdata[index+1];
            val[2] = srcdata[index+2];
            Fill2File(val);
        }
    }
    console.log("over")
}
function BiLinear(){
    
}