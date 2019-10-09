"use strict"
function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.sayName=function(){
        console.log(this.name);
    };
}
var person1=new Person("jesson",25,"data");
var person2=new Person("json",22,"progress");
person1.sayName();
person2.sayName();
console.log(person1.constructor==Person);
console.log(person2.constructor==Person);
console.log(person1.constructor==Object);
console.log(person2.constructor==Object);
console.log(person1 instanceof Person);
console.log(person2 instanceof Person);
console.log(person1 instanceof Object);
console.log(person2 instanceof Object);
console.log(person1.sayName==person2.sayName);
/**剩下的部分做当常规函数调用的例子没有实现 */
