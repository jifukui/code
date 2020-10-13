// const process = require('process');
class JiPromise{
    static PADING = "UNKNOW";
    static GOOD = "GOOD";
    static BAD  = "BAD";
    //传入的是一个回调函数，参数是成功的调用和失败的调用
    constructor(executor){
        this.status = JiPromise.PADING;
        this.value = null;
        executor(this.ongood.bind(this),this.onbad.bind(this));
    }
    ongood(value){
        if(this.status === JiPromise.PADING){
            this.status = JiPromise.GOOD;
            this.value = value;
        }
    }
    onbad(value){
        if(this.status === JiPromise.PADING){
            this.status = JiPromise.BAD;
            this.value = value;
        }
    }
    then(good,bad){
        good = good || function(){
            console.log("This data is good");
        }
        bad = bad ||function(){
            console.log("This data is bad");
        }
        if(this.status === JiPromise.GOOD){
            setTimeout(()=>{
                try{
                    good(this.value);
                }catch(err){
                    bad(err);
                }
            },12)
            
        }else if(this.status === JiPromise.BAD ){
            setTimeout(()=>{
                try{
                    bad(this.value);
                }catch(err){
                    bad(err);
                }
            },12)
        }

    }
}