const yaml = require("yaml");
const fs = require("fs");
const file = fs.readFileSync('50-cloud-init.yaml', 'utf8')
// console.log(file)
let data= yaml.parse(file);
console.dir(data.network.ethernets.eth0);
let ip = data.network.ethernets.eth0.addresses;
console.log(`the ip is ${ip}`);
// data.network.ethernets.eth0.dhcp4=false;
// data.network.ethernets.eth0.addresses=["192.168.20.221/23"]
// console.log(yaml.stringify(data));
// let ip = data.network.ethernets.eth0.addresses;
// fs.writeFileSync("62-cloud-init.yaml",yaml.stringify(data),{
//     encoding:"utf-8"
// },(err)=>{
//     if(err){
//         console.log(`write file have error ${err}`);
//     }else{
//         console.log("write file success")
//     }
// })
// const data = yaml.parseDocument(file)
// console.log(data.get("network"))
// let network =data.get("network");
// console.log(network.get("eth0"));
// fs.writeFileSync("53-cloud-init.yaml",yaml.toString(data),{
//     encoding:"utf-8"
// },(err)=>{
//     if(err){
//         console.log(`write file have error ${err}`);
//     }else{
//         console.log("write file success")
//     }
// })