"use strict"
function object(o){
    function F(){};
    F.prototype=o;
    return new F();
}
var person={
    name:"data",
    firedns:["num","int","long"]
};
var a1=object(person);
a1.name="Rob";
a1.firedns.push("char");
var a2=object(person);
a2.name="Linda";
a2.firedns.push("double");
console.log(a1.firedns);
console.log(a2.firedns);