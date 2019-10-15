"use strict"
function SuperType(name){
    this.name=name;
    this.colors=[1,2,3,4];
};
SuperType.prototype.sayName=function(){
    console.log(this.name);
};
SuperType.prototype.saycolor=function(){
    console.log(this.colors);
};
function SubType(name,age){
    SuperType.call(this,name);  
    this.age=age;
    this.data=[5,6,7]; 
};
SubType.prototype=new SuperType();
SubType.prototype.sayAge=function(){
    console.log(this.age);
}
SubType.prototype.sayData=function(){
    console.log(this.data);
}
var a1=new SubType("aaa",24);
var a2=new SubType("bbbb",29);
a1.colors.push(5)
a1.data.push(9);
a1.sayName();
a2.sayName();
a1.sayAge();
a2.sayAge();
a1.sayData();
a2.sayData();
a1.saycolor();
a2.saycolor();