var reg=/(netbios name)([\s]*)=([\s]*)([a-zA-Z]{1}[\w]+)/
const fs = require("fs");
const os = require("os");
const readline = require("readline");
// let file = fs.createReadStream("lig_smb.conf");
// let line = readline.createInterface({
//     input:fs.createReadStream("lig_smb.conf"),
//     crlfDelay:Infinity
// });
// let file = fs.createWriteStream("./jifukui.conf");
// line.on("line",(msg)=>{
//     // console.log(`the message is ${msg}`);
//     let w = msg;
//     if(!msg||msg[0]=="#"){
//     }else{
//         let value = msg.match(reg)
//         if(value){
//             let data=msg.replace(value[0],`netbios name = jifukui`);
//             w=data;
//         }
        
//     }
//     file.write(w);
//     file.write(os.EOL);
// });
// line.on("close",()=>{
//     console.log("have end of this");
// })
async function GetFileContentByLine(path,reg){
    return new Promise((res,rej)=>{
        let line = readline.createInterface({
            input:fs.createReadStream(path),
            crlfDelay:Infinity
        });
        line.on("line",(msg)=>{
            let w = msg;
            if(!msg||msg[0]=="#"){
            }else{
                let value = msg.match(reg)
                if(value){
                    return res(value)
                } 
            }
        });
        line.on("close",()=>{
            return rej("not find this content")
        })
    })
}
GetFileContentByLine("lig_smb.conf",reg).then((res)=>{
    console.log(res);
}).catch(err=>{
    console.log(`the error is ${err}`);
})