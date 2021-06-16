const type  = require("./type");
function ArraytoBits(val){
    let data = val.map(val=>{
        val+=256;
        return val.toString("2").substr(1,8);
    });
    data = data.join("");
    // console.log(data)
    return {
        index:0,
        data,
        length:data.length
    }
}
// let data =[0x22,0x32];
function GetData(val,num){
    let data = GetRawData(val,num);
    // console.log(`the data is ${data}`)
    data = data.toString(16);
    // console.log(`the data is ${data}`)
    return data;
}
function GetRawData(val,num){
    let data = GetRaw(val,num); 
    // console.log(`the raw data is ${data}`)
    data = parseInt(data,2);
    return data;
}
function GetRaw(val,num){
    let data = val.data.substr(val.index,num);
    val.index+=num;
    return data;
}
function SkipData(val,num){
    val.index+=num;
}
function GetGolomb(val){
    let len = val.data.indexOf("1",val.index);
    // console.log(`len is ${len} and index is ${val.index}`)
    let length = len - val.index + 1;
    val.index = len;
    let value = GetRawData(val,length)-1;
    // value = value.toString(16)
    return value;
}
function GetFloatRaw(val,num){
    let data = val.data.substr(val.index,num);
    console.log(`the data is ${data}`)
    val.index+=num;
    data = parseFloat(data)
    return data;
}
// ArraytoBits(data);
exports.BitStream = ArraytoBits;
exports.GetData = GetData;
exports.GetGolomb = GetGolomb;
exports.GetFloatRaw = GetFloatRaw;
exports.GetRawData = GetRawData