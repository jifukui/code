const unzip = require("compressing");
unzip.zip.compressDir('DB', 'test.zip')
.then(()=>{
    console.log("good for this")
})
.catch((err)=>{
    console.log(`have error ${err}`)
});