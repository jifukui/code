var a= []
var arr = new Proxy(a,{
    get:function(obj,prob){
        console.log(`the obj is ${a} and the prob is ${prob}`);
    }
});
console.log(`a.length is ${a.length}`)
console.log(`a.length is ${arr.length}`)
a[0]=9
console.log(`a[0] is ${a[0]}`)
console.log(`a[0] is ${arr[0]}`)