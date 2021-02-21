const fs = require("fs");
const stream = require("stream");
const file = fs.createWriteStream("uyvy2rgb_red.yuv");
const color = [0x5a,0x51,0xef,0x51];
const height = 180;
const wight = 320;
uyvy2rgb(color)
//rgb2uyvy(color);
function rgb(color){
    let val = Buffer.alloc(3);
    for(let i= 0;i<color.length;i++){
        val[i]= color[i];
    }
    Fill2File(val);
}

function rgb2yuv(val){
    let data = Buffer.alloc(3);
    let r = val[0];
    let g = val[1];
    let b = val[2];
    data[0] = 0.257*r + 0.504*g +0.098*b +16;
    data[1] = -0.148*r - 0.291*g +0.439*b +128;
    data[2] = 0.439*r -0.368*g -0.071*b +128;
    Fill2File(data);
}
function rgb2uyvy(val){
    let data = Buffer.alloc(4);
    let r1 = val[0];
    let g1 = val[1];
    let b1 = val[2];
    //u
    data[0] = -0.148*r1 - 0.291*g1 +0.439*b1 +128;
    //y
    data[1] = 0.257*r1 + 0.504*g1 +0.098*b1 +16;
    //v
    data[2] = 0.439*r1 -0.368*g1 -0.071*b1 +128;
    //y
    data[3] = 0.257*r1 + 0.504*g1 +0.098*b1 +16;
    Fill2File(data);
}
function yuv2rgb(val){
    let data = Buffer.alloc(3);
    let y = val[0];
    let u = val[1];
    let v = val[2];
    let r,g,b
    r = 1164*(y-16)+1596*(v-128);
    g = 1164*(y-16)-391*(u-128)-813*(v-128) ;
    b = 1164*(y-16)+2018*(u-128);
    console.log(`r is ${r}`)
    console.log(`g is ${g}`)
    console.log(`b is ${b}`)
    if(r>255000){
        r = 255;
    }
    if(r<0){
        r= 0
    }
    if(g>255000){
        g = 255;
    }
    if(g<0){
        g= 0
    }
    if(b>255000){
        b = 255;
    }
    if(b<0){
        b= 0
    }
    data[0] = r/1000;
    data[1] = g/1000;
    data[2] = b/1000;
    console.log(`r is ${data[0]}`)
    console.log(`g is ${data[1]}`)
    console.log(`b is ${data[2]}`)
    Fill2File(data);
}
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
        console.log(`rgb is ${rgb[i]}`)
        if(rgb[i]>255000){
            rgb[i]=255000
        }
        if(rgb[i]<0){
            rgb[i] = 0;
        }
        rgb[i]/=1000;
        data[i] = rgb[i];
        console.log(`data is ${data[i]} and rgb is ${rgb[i]}`)
    }
    Fill2File(data);
}

function Fill2File(val){
    let len = height * wight/2;
    for(let i =0;i<len;i++){
        file.write(val,"binary");
    }
    console.log("over");
}