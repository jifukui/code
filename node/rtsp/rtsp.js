const net = require("net");
const crypto = require("crypto");
const md5 = crypto.createHash('md5');
let status = 0;
const val1 = "909466d4ea4960dc194924c18b2b3256"
const val2 = "762aca2cbae34fce6cdfe6b117d51181"
const val3 = "b2b3154ff5afa289a21eb58baa6eb991"
let auth = false
let server = net.connect({
    port:554,
    host:"192.168.254.9"
});
server.on("connect",()=>{
    console.log("I have send data");
    status = 0;
    auth = 0;
    server.write(`OPTIONS rtsp://192.168.254.9:554/h265/ch1/main/av_stream RTSP/1.0\r\nCSeq:1\r\n\r\n`);
});
server.on("data",data=>{
    switch(status){
        case 0:{
            console.log(`Get method sucess`);
            GetMethod(data);
            server.write(`DESCRIBE:rtsp://192.168.254.9:554/h265/ch1/main/av_stream\r\n\r\n`);
            status = 1;
            break ;
        }
        case 1:{
            let opt = {}
            if(GetAuthStatus(data,opt)){
                console.log("good to auth")
                status = 2;
            }else{
                console.log("failed to auth");
                console.log(status);
                server.write(Auth(opt));
            }
            break;
        }
    }
    // console.log(`the data is ${data}`);
});
function GetMethod(value){
    console.log("Hello start get medthod")
    let data = value.toString().split("\r\n");
    let medthod="";
    for(let i=2;i<data.length;i++){
        let value=data[i];
        if(value.startsWith("Public")){
            medthod = value.substring(8);
            break;
        }
    }
    if(medthod){
        let value = medthod.split(",");
        medthod=[]
        medthod.push(value[0]);
        for(let i=1;i<value.length;i++){
            medthod.push(value[i].trim());
        }
        console.log(`the method is `)
        console.dir(medthod);
    }
}
function GetAuthStatus(data,option){
    data = data.toString();
    data = data.toString().split("\r\n");
    console.dir(data);
    if(data[0].search('Unauthoriized')){
        auth = true;
        let value = data[1].split(",");
        console.log(typeof data[1])
        console.log(data[1]);
        option.str = data[1].substring(0,data[1].lastIndexOf(","))
        for(let i=0;i<value.length;i++){
            let st = value[i].trim();
            console.log(st)
        }
        return false;
    }else{
        console.log("author success")
    }
    return true;
}
function Auth(opt) {
    console.dir(opt);
    let str = "DESCRIBE:rtsp://192.168.254.9:554/h265/ch1/main/av_stream\r\n`";
    str +=`\r\n\r\n`
    return str;
}
// csonsole.log(md5.update(`${val1}:${val2}:${val3}`).digest("hex"))