const dns = require("dns");
dns.resolve("www.baidu.com","A",function(err,data){
    if(err){
        console.log("The error is "+err);
    }
    else{
        console.log("the data is "+data);
    }
})