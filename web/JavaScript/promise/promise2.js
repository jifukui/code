let promise=new Promise(function(resolve,reject){
    console.log("Promise");
    resolve("jifukui");
});
promise.then(function(value){
    console.log(value);
})
console.log("Hello")