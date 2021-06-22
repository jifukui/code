const fs = require("fs");
const { exit } = require("process");
const stream = require("stream");
const src = fs.createReadStream("man.yuv");
const dst = fs.createWriteStream("man_4.yuv");

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
    // NearestNeighbor();
    BiLinear();
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
    // let wr = w / w1;
    // let hr = h / h1;
    for (let i = 0; i < h1; i++) {
        let y = (i + 0.5) * h / h1 - 0.5;
        let y1 = y - Math.floor(y);
        let y2 = 1 - y1;
        y = Math.floor(y)
        for (let n = 0; n < w1; n++) {
            let x = (n + 0.5) * w / w1 - 0.5;
            let x1 = x - Math.floor(x);
            let x2 = 1 - x1;
            x = Math.floor(x);
            let point = [4];
            // console.log(y, x)
            point[0] = (y * w + x) * 3;
            point[1] = (y * w + x + 1) * 3;
            point[2] = ((y + 1) * w + x) * 3;
            point[3] = ((y + 1) * w + x + 1) * 3;
            // console.log(i, n, x, y, ...point)
            let val = Buffer.alloc(3);
            val[0] = srcdata[point[0]] * y2 * x2 +
                srcdata[point[1]] * y2 * x1 +
                srcdata[point[2]] * y1 * x2 +
                srcdata[point[3]] * y1 * x1;
            val[1] = srcdata[point[0] + 1] * y2 * x2 +
                srcdata[point[1] + 1] * y2 * x1 +
                srcdata[point[2] + 1] * y1 * x2 +
                srcdata[point[3] + 1] * y1 * x1;
            val[2] = srcdata[point[0] + 2] * y2 * x2 +
                srcdata[point[1] + 2] * y2 * x1 +
                srcdata[point[2] + 2] * y1 * x2 +
                srcdata[point[3] + 2] * y1 * x1;
            // process.exit(0)
            Fill2File(val);
        }
    }
    console.log("over")
}
function Bicubic() {

}