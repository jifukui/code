const fs = require("fs");
const stream = require("stream");
const BMP={}
BMP.name="BM";
BMP.address = 0;
BMP.datalength = 0;
BMP.start = 0;
BMP.bits = 0;
BMP.compress = 0;
const file = fs.createReadStream("./test.bmp");
function ReadFile(){
    console.log("the file can read");
    GetBMPHeader();
    GetFIleInfo();
    GetColorTable();
    console.log(`the data length is ${BMP.address}`)
    if(BMP.address===BMP.start){
        console.log(`get Data and Address is ${BMP.address}`)
        console.log(`the data length is ${BMP.datalength}`)
        let length = 0;
        while(length<BMP.datalength){
            
        }
        //let data = file.read(BMP.datalength);
        //console.log(`the data is ${data}`)
        //BMP.data = data;
        //console.log(BMP.data.toString("hex"));
    }
    file.close();
}

function GetBMPHeader(){
    GetFlage();
    GetFileSize();
    GetReserved(2);
    GetReserved(2);
    GetDataAddress();
}
function GetFIleInfo(){
    GetInfoHeadSize();
    GetFileWidth();
    GetFileHeight();
    GetFilePlanes();
    GetFileBitCount();
    GetFileCompressType();
    GetFileImageSize();
    GetFileX();
    GetFileY();
    GetFileClrUsed();
    GetFileImport();
}
function GetColorTable(){
    let tables ;
    switch(BMP.bits){
        case 1:
            tables = 2;
            break;
        case 4:
            tables = 16;
            break;
        case 8:
            tables = 256;
            break;
        case 16:
            if(BMP.compress==0){
                tables = 0;
            }
            break;
        case 24:
            tables = 0;
            break;
        case 32:
            if(BMP.compress==0){
                tables = 0;
            }
    }
    console.log(`the color tables numbers is ${tables}`);
    GetReserved(tables*4);
}
function GetFlage(){
    let flag = Getstring(2);
    if(flag&&flag.toString("ascii")===BMP.name){
        console.log(`the file is BMP file`)
    }else{
        console.log("the file type error");
    }
}
function GetFileSize(){
    let size = GetNumber(4);
    console.log(`the file size is ${size}`);
}

function GetDataAddress(){
    let address = GetNumber(4);
    BMP.start = address;
    console.log(`the file start address is ${address}`);
}
function GetInfoHeadSize(){
    let size = GetNumber(4);
    console.log(`the info header size is ${size}`)
}
function GetFileWidth(){
    let width = GetNumber(4);
    console.log(`the file width is ${width}`);
}
function GetFileHeight(){
    let height = GetNumber(4);
    console.log(`the file width is ${height}`);
}
function GetFilePlanes(){
    let planes = GetNumber(2);
    console.log(`the file planes is ${planes}`);
}
function GetFileBitCount(){
    let bits = GetNumber(2);
    BMP.bits = bits;
    console.log(`the file bits is ${bits}`);
}
function GetFileCompressType(){
    let type = GetNumber(4);
    let str=""
    switch(type){
        case 0:
            str = "BI_RGB 不压缩";
            break;
        case 1:
            str = " BI_RLE8 8比特游程编码（BLE），只用于8位位图";
            break;
        case 2:
            str = " BI_RLE4 4比特游程编码（BLE），只用于4位位图";
            break;
        case 3:
            str = "BI_BITFIELDS比特域（BLE），只用于16/32位位图";
            break;
        default:
            str = "未知的类型";
            break;
    }
    BMP.compress = type
    console.log(`the file compress type is ${str}`)
    console.log(`the file type is ${type}`)
}
function GetFileImageSize(){
    let size = GetNumber(4);
    BMP.datalength = size;
    console.log(`the file size is ${size}`)
}
function GetFileX(){
    let x  = GetNumber(4);
    console.log(`the x is ${x}`)
}
function GetFileY(){
    let y  = GetNumber(4);
    console.log(`the y is ${y}`)
}
function GetFileClrUsed(){
    let used = GetNumber(4);
    console.log(`the file used ${used}`);
}
function GetFileImport(){
    let im = GetNumber(4);
    console.log(`the import is ${im}`)
}
function GetNumber(num){
    let data = file.read(num);
    switch(num){
        case 1:
            data = data.readUInt8LE();
            break;
        case 2:
            data = data.readUInt16LE();
            break;
        case 4:
            data = data.readUInt32LE();
            break;
        case 8:
            data = data.readUInt64LE();
            break;
    }
    BMP.address+=num;
    return data;
}
function Getstring(num){
    let data = file.read(num);
    BMP.address+=num;
    return data.toString("ascii");
}
function GetReserved(num =2){
    BMP.address+=num;
    file.read(num);
}
file.on("readable",ReadFile);
