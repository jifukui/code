const fs = require("fs");
const stream = require("stream");
const src = fs.createReadStream("man.yuv");
const dst = fs.createWriteStream("man_3.yuv");

let w = 1279;
let h = 735;
let srcdata = Buffer.alloc(w * h * 3);
let index = 0;
let w1 = 640;
let h1 = 480;
let dstdata = [];
src.on("data", (data) => {
    srcdata.fill(data, index);
    index += data.length;
});
src.on("close", () => {
    NearestNeighbor();
});
function Fill2File(val) {
    val = Buffer.from(val)
    dst.write(val, "binary");
}
function NearestNeighbor() {
    let wr = w / w1;
    let hr = h / h1;
    for (let i = 0; i < h1; i++) {
        let y = Math.round(i * hr + 0.5);
        for (let n = 0; n < w1; n++) {
            let x = Math.round(n * wr + 0.5);
            let index = (y * w + x) * 3;
            let val = Buffer.alloc(3);
            val[0] = srcdata[index];
            val[1] = srcdata[index + 1];
            val[2] = srcdata[index + 2];
            Fill2File(val);
        }
    }
    console.log("over")
}
function BiLinear() {
    let wr = w / w1;
    let hr = h / h1;
    for (let i = 0; i < h1; i++) {
        let y = Math.round(i * hr + 0.5);
        for (let n = 0; n < w1; n++) {
            let x = Math.round(n * wr + 0.5);
            let index = (y * w + x) * 3;
            let val = Buffer.alloc(3);
            val[0] = srcdata[index];
            val[1] = srcdata[index + 1];
            val[2] = srcdata[index + 2];
            Fill2File(val);
        }
    }
    console.log("over")
}