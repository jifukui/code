const fs = require("fs");
const stream = require("stream");
let file = fs.createWriteStream("rgb_graw444.yuv");
drawrgb();
function drawrgb(){
    for(let i = 0;i<720;i++){
        for(let n=0;n<1280;n++){
            let index = parseInt(n/5);
            var data = Buffer.alloc(3,index);
            data = rgb2yuv(data)
            file.write(data);
        }
    }
    console.log("over")
}
function rgb2yuv(val){
    let data = Buffer.alloc(3);
    let r = val[0];
    let g = val[1];
    let b = val[2];
    data[0] = 0.257*r + 0.504*g +0.098*b +16;
    data[1] = -0.148*r - 0.291*g +0.439*b +128;
    data[2] = 0.439*r -0.368*g -0.071*b +128;
    return data
}
function rgb2yuv422(val){
    let data = Buffer.alloc(3);
    let r = val[0];
    let g = val[1];
    let b = val[2];
    data[0] = 0.257*r + 0.504*g +0.098*b +16;
    data[1] = -0.148*r - 0.291*g +0.439*b +128;
    data[2] = 0.439*r -0.368*g -0.071*b +128;
    return data
}