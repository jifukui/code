function SuperType(){
    this.colors=["red","blue","green"];
}
function SubType(){
    this.data=[1,2,3]
    SuperType.call(this);
}
var p1=new SubType();
p1.colors.push("black");
p1.data.push(4);
console.log(p1.colors);
console.log(p1.data);
var p2=new SubType();
console.log(p2.colors);
console.log(p2.data);