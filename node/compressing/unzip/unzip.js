const unzip = require("compressing");
unzip.zip.uncompress('BlueCore.zip', './')
.then(()=>{
    console.log("good for this")
})
.catch((err)=>{
    console.log(`have error ${err}`)
});