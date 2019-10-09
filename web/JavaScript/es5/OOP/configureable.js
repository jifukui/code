"use strict"
var jifukui=function(vale){
    let i;
    for(i in vale)
    {
        console.log(i);
    }
}
var person={};
Object.defineProperty(person,"name",{
    configurable:false,
    enumerable:false,
    writable:true,
    value:"jifukui"
});
person.name="jifukui1";
person.sayname=function(){
    console.log(this.name);
}
var data={};
data=Object.getOwnPropertyDescriptor(person,"name");
console.log(JSON.stringify(data));
jifukui(person);
Object.defineProperty(person,"name",{
    writable:false
});
data=Object.getOwnPropertyDescriptor(person,"name");
console.log(JSON.stringify(data));
person.sayname();
/*person.name="jifukui12";
person.sayname();
Object.defineProperty(person,"name",{
    enumerable:false
});*/
data=Object.getOwnPropertyDescriptor(person,"name");
console.log(JSON.stringify(data));
