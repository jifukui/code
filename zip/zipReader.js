const fs  =  require("fs");
function ZipFileReader(){
    let file = fs.openSync("./test.zip","r");
    let headerlen = Buffer.alloc(2);
    fs.readSync(file,headerlen,0,2,26);
    console.log(`the file length is ${headerlen.toString("hex")} and number is ${headerlen.readUInt16LE()}`);
    let extendlen = Buffer.alloc(2);
    fs.readSync(file,extendlen,0,2,28);
    console.log(`the extend length is ${extendlen.toString("hex")} and number is ${extendlen.readUInt16LE()}`);
    let leg = headerlen.readUInt16LE(0);
    let head = Buffer.alloc((headerlen.readUInt16LE()+extendlen.readUInt16LE()+30));
    console.log(`the head length is ${head.length} and ${leg}`)
    fs.readSync(file,head,0,head.length,0);
    ZipFileReader_LocalfileHeader(head);
}
function ZipFileReader_LocalfileHeader(data){
    console.log(`the data is ${data.toString("hex")}`);
    console.log(`压缩版本 ${data.readUInt16LE(4)}`);
    // console.log(`解压版本 ${data.readUInt16LE(6)}`);
    const medth = data.readUInt16LE(8);
    compressionmethod(medth);
    generalpurpose(data.readUInt16LE(6),medth);
    GetTime(data.readUInt16LE(10));
    GetDate(data.readUInt16LE(12));
    let crc = data.slice(14,18);
    console.log(`CRC的值为${crc.toString("hex")}`);
    compressSize(data.readUInt32LE(18));
    UncompressSize(data.readUInt32LE(22));
    FileNameLength(data.readUInt16LE(26));
    ExtentLength(data.readUInt16LE(28));
    FileName(data.slice(30,30+data.readUInt16LE(26)))
}
function generalpurpose(data,medth){
    if(data & 1){
        console.log("文件加密");
    }else{
        console.log("文件未加密");
    }
    switch(medth){
        case 6:{
            if(data & 2){
                console.log(`使用8K滑动字典`);
            }else{
                console.log(`使用4K滑动字典`);
            }
            if(data & 4){
                console.log(`3个Shannon-Fano树被用来编码滑动输出字典`)
            }else{
                console.log(`使用香农法诺树`);
            }
            break;
        }
        case 8:{

        }
        case 9:{
            let val = data & 6;
            val = val>> 1 ;
            console.log(`the data is ${val}`);
            let str =[
                `常规压缩方式`,
                `使用最大压缩方式`,
                `使用快速压缩方式`,
                `使用超快速压缩方式`
            ]
            console.log(`压缩模式为:${str[val]}`)
            break;
        }
    }
    if(data & 8){
        console.log(`crc 未压缩大小和压缩大小在本地文件头中`);
    }else{
        console.log(`crc 未压缩大小和压缩大小在数据描述表中`)
    }
    if((data & 16) && (medth == 8) ){
        console.log(`增强型的deflating压缩`);
    }
    if(data & 32){
        console.log(`文件压缩修补数据`);
    }else{
        console.log(`文件没有压缩修补数据`);
    }
    if(data & 64){
        console.log(`增强加密`);
    }else{
        console.log(`没有增强加密`);
    }

}
const compressionmeth=[
    `未压缩文件`,
    `文件是压缩文件`,
    `文件压缩因子为1`,
    `文件压缩因子为2`,
    `文件压缩因子为3`,
    `文件压缩因子为4`,
    `文件是内爆文件`,
    `为标记化压缩算法保留`,
    `文件是Deflated压缩`,
    `使用Deflate64（tm）增强`,
    `PKWARE数据压缩库内爆`,
    `PKWARE预留`,
    `使用BZIP2算法压缩文件`
]
function compressionmethod(data){
    if(data<compressionmeth.length){
        console.log(`文件压缩方式为:${compressionmeth[data]} method is ${data}`);
    }else{
        console.log(`错误的压缩方式`)
    }
}
function GetDate(value){
    console.log(`the date is ${value}`)
}
function GetTime(value){
    console.log(`the time is ${value}`)
}
function compressSize(value){
    console.log(`压缩文件大小${value} Byte`);
}
function UncompressSize(value){
    console.log(`未压缩文件大小${value} Byte`);
}
function FileNameLength(value){
    console.log(`文件名长度${value} Byte`);
}
function ExtentLength(value){
    console.log(`扩展长度${value} Byte`);
}
function FileName(value){
    console.log(`the file name is ${value.toString("ascii")}`)
}
ZipFileReader();