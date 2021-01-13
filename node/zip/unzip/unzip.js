const { createInflateRaw } = require('zlib');
const { pipeline } = require('stream');
const {
  createReadStream,
  createWriteStream
} = require('fs');
const { promisify } = require('util');
const pipe = promisify(pipeline);
async function do_gunzip(input, output) {
    const gzip = createInflateRaw();
    const source = createReadStream(input);
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
  }
  
do_gunzip('jifukui1.zip', 'haha1.txt').then(()=>{
    console.log("unzip successful");
}).catch((err) => {
    console.error('发生错误:', err);
    process.exitCode = 1;
})
// const gzip = createGunzip();
// const source = createReadStream("BlueCore.zip");
// const destination = createWriteStream("BlueCore");
// source.pipe(gzip).pipe(destination)