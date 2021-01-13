const filesystem = require("fs");
// var file = filesystem.open("./BlueCore.log");
// filesystem.open("./BlueCore.log","w+",(err,fd)=>{
//     if(err){
//         console.log("have some error");
//         console.dir(err);
//     }else{
//         console.log("good open file ");
//         filesystem.write(fd,"jifukuitest",0,"ascii",(err,num,str)=>{
//             if(err){
//                 return ;
//             }
//             console.log(`the write num is ${num}`);
//             console.log(`the string is ${str}`)
//         })
//         filesystem.close(fd,(err)=>{
//             if(err){
//                 console.log("have some error");
//             }else{
//                 console.log("close file ok ");
//             }
//         })
//     }
// })


const fs = filesystem.createWriteStream("BlueCore.log");
let flag= fs.write("jifukui");
console.log(`the flag is ${flag}`);
flag= fs.write("start work");
console.log(`the flag is ${flag}`);