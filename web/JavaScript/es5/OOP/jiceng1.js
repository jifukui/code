function SuperType(){
    this.colors=["red","blue","green"];
}
function SubType(){

}
SubType.prototype=new SuperType();
var p1=new SubType();
p1.colors.push("black");
console.log(p1.colors);
var p2=new SubType();
console.log(p2.colors);