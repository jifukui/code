"use strict"
function Person(){};
Person.prototype.name="database";
Person.prototype.age=27;
Person.prototype.job="software"
Person.prototype.sayName=function(){
    console.log(this.name);
}
var p1=new Person();
var p2=new Person();
console.log(p1.hasOwnProperty("name"));
console.log("name" in p1);
p1.name="jsoon";
console.log(p1.hasOwnProperty("name"));
console.log("name" in p1);
p1.sayName();
p2.sayName();
delete p1.name;
console.log(p1.hasOwnProperty("name"));
console.log("name" in p1);
p1.sayName();
var keys=Object.keys(Person.prototype);
console.log(keys);
keys=Object.keys(p1);
console.log(keys);
keys=Object.getOwnPropertyNames(Person.prototype);
console.log(keys);
keys=Object.getOwnPropertyNames(p1);
console.log(keys);