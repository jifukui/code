"use strict"
function object(o){
    function F(){};
    F.prototype=o;
    return new F();
};
function inheritPrototype(subType,SuperType){
    var prototype=object(SuperType.prototype);
    prototype.constructor=subType;
    subType.prototype=prototype;
};
function SuperType(name)
{
    this.name=name;
    this.colors=["red","blue","green"];
};
SuperType.prototype.sayName=function(){
    console.log(this.name);
}
function SubType(name,age){
    SuperType.call(this,name);
    this.age=age;
}
inheritPrototype(SubType,SuperType);
SubType.prototype.sayAge=function(){
    console.log(this.age);
}
var a1=new SubType("luck",56);
var a2=new SubType("lucy",89);
a1.colors.push("yellow");
a1.sayName();
a2.sayName();
a1.sayAge();
a2.sayAge();
console.log(a1.colors);
console.log(a2.colors);
