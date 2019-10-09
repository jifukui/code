"use strict"
function createPerson(name,age,job){
    var o = new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function(){
        console.log(this.name);
    };
    return o;
}
var person1=createPerson("jesson",25,"data");
var person2=createPerson("json",22,"progress");
person1.sayName();
person2.sayName();
console.log(person1.constructor==createPerson);
console.log(person2.constructor==createPerson);
console.log(person1.constructor==Object);
console.log(person2.constructor==Object);
console.log(person1 instanceof createPerson);
console.log(person2 instanceof createPerson);
console.log(person1 instanceof Object);
console.log(person2 instanceof Object);