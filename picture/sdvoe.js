const fs = require("fs");
const stream = require("stream");
const file = fs.createWriteStream("all.yuv");
const yuv = fs.createReadStream("frame8.yuv");
const height = 180;
const wight = 320;
yuv.on("readable",()=>{
    let data;
    do{
        data = yuv.read(4);
        if(data){
            //console.log(`read data is ${data.toString("hex")}`);
            let val = uyvy2rgb(data);
            file.write(val)
        }
    }while(data);
    console.log("have over for read data ")
});
yuv.on("end",()=>{
    console.log("读取文件结束");
    //yuv.close();
});
function uyvy2rgb(val){
    let data = Buffer.alloc(6);
    let y = val[1];
    let u = val[0];
    let v = val[2];
    let y1 = val[3];
    let rgb=[6];
    rgb[0] = 1164*(y-16)+1596*(v-128);
    rgb[1] = 1164*(y-16)-391*(u-128)-813*(v-128) ;
    rgb[2] = 1164*(y-16)+2018*(u-128);

    rgb[3] = 1164*(y1-16)+1596*(v-128);
    rgb[4] = 1164*(y1-16)-391*(u-128)-813*(v-128) ;
    rgb[5] = 1164*(y1-16)+2018*(u-128);
    for(let i =0;i<6;i++){
        //console.log(`rgb is ${rgb[i]}`)
        if(rgb[i]>255000){
            rgb[i]=255000
        }
        if(rgb[i]<0){
            rgb[i] = 0;
        }
        rgb[i]/=1000;
        data[i] = rgb[i];
        //console.log(`data is ${data[i]} and rgb is ${rgb[i]}`)
    }
    return data;
}