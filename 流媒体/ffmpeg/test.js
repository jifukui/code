const ffmpeg = require("ffmpeg.js")
ffmpeg({
    arguments:["-version"],
    print:function(data){
        console.log(`the verison is ${data}`)
    },
    onExit:function(code){
        console.log(`the exit data is ${code}`)
    },
    printErr:function(err){
        console.log(`have error ${err}`)
    }
})