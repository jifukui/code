let arr = [];
let sore= [];
function SoreDevice(obj){
    let res={};
    let len = sore.length;
    let value = obj.fps;
    let min = 0;
    let max = len-1;
    while(min < max){
        let mid = min + Math.floor((min+max)/2);
        if(sore[mid].fps>value){
            max-=1;
        }else if(sore[mid].fps<value){
            min+=1;
        }else{
            res.find = true;
            res.index = mid;
            return res;
        }
    }
    res.find = false;
    res.index = mid;
    return res;
}
function InsrtDevice(obj){
    let len = arr.length;
    if(len===0){
        arr.push(obj);
        sore.push({"index":0,"fps":0});
    }else{
        let res = SoreDevice(obj);
        if(res.find)
        {
            arr.splice(sore,0,)
        }
        if(len<30){

        }else{

        }
    }
}
class Device{
    constructor(name,fps = 0){
        this.name = name;
        this.fps = fps;
        return new Proxy(this,{
            set(obj,prob,val){
                console.log("have prob change");
                if(prob === "fps"){
                    
                }else{
                    this[prob] = val;
                    obj.fps++;
                }
            }
        })
    }
}
let sdvoe = new Device("公孙胜");
let sdvoe1 = new Device("老油条");
sdvoe.name = "会议室";
sdvoe1.name = "办公室";
sdvoe1.name = "关点";
sdvoe1.name = "宋洋";
console.log(sdvoe);
console.log(sdvoe1);