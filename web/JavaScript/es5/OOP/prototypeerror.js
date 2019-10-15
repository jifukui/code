"use strict"
function Person(){};
Person.prototype={
    constructor:Person,
    name:"database",
    age:29,
    job:"software",
    friends:["mysql","mongodb"],
    sayName:function(){
        console.log(this.name);
    }
};
var p1=new Person();
var p2=new Person();
p1.friends.push("db2");
p1.friends.push("db3");
console.log(p1.friends);
console.log(p2.friends);
console.log(p1.friends===p2.friends);
console.log(p1.sayName===p2.sayName);