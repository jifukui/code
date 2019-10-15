"use strict"
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.friend=["1","2"];
}
Person.prototype={
    constructor:Person,
    sayName:function(){
        console.log(this.name);
    }
}
var p1=new Person("jsson",25,"12345");
var p2=new Person("jdsson",2,"1ff2345");
p1.friend.push("3");
p1.friend.push("4");
console.log(p1.friend);
console.log(p2.friend);
console.log(p1.friends===p2.friends);
console.log(p1.sayName===p2.sayName);