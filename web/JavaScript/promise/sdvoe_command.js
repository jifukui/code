let command=new Map();
command.set("require blueriver_api 3.0.0.0",GetApi)
function GetApi(object){
    let{status,error}=object;
    console.log("the error is "+error);
    console.log("the status is "+status);
}
//console.dir(command);
module.exports = command;