var a= [1,2,3]
var arr = new Proxy(a,{
    get:function(obj,prob){
        console.log(`the obj is ${a} and the prob is ${prob}`);
        return obj[prob]
    },
    set:function(obj,prob,value){
        console.log(`the prob is ${prob} and the value is ${value}`);
        obj[prob] = value
        return true;
    }
});
console.log(`a.length is ${a.length}`)
console.log(`a.length is ${arr.length}`)
a[0]=9
console.log(`a[0] is ${a[0]}`)
console.log(`a[0] is ${arr[0]}`)
arr[1] = 7;
console.log(`a.length is ${a.length}`)
console.log(`a.length is ${arr.length}`)