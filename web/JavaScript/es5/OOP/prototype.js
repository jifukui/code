"use strict"
function Perosn(){};
Perosn.prototype.name="jesson";
Perosn.prototype.age=26;
Perosn.prototype.job="Software";
Perosn.prototype.sayName=function(){
    console.log(this.name);
}
var person1=new Perosn();
person1.sayName();
var person2=new Perosn();
person2.sayName();
console.log(person1.sayName==person2.sayName);