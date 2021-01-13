const Database = require("mongodb").MongoClient;
class LiguoDataBase{
    static Data;
    constructor(ip="127.0.0.0",port=27017){
        this.ip = ip;
        this.port = port;
    }
    async Init(){
        await Database.connect(`mongodb://${this.ip}:${this.port}`,{
            useUnifiedTopology:true
        }).then((doc)=>{
            console.log("database have connected ");
            this.Data=doc;
        },(err)=>{
            console.log(`database connected have faile ${err}`);
        })
    }
    async Destory(){
        if(LiguoDataBase.Data)
        {
            console.log("数据库存在，并关闭数据库");
            LiguoDataBase.Data.close();   
        }
        else
        {
            console.log("数据库不存在");
        }
    }
}
module.exports = LiguoDataBase;