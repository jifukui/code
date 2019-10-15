function SuperType(){
    this.property=true;
}
SuperType.prototype.getSuperValue=function(){
    console.log(this.property);
}
function SubType(){
    this.subproperty=false;
};
SubType.prototype=new SuperType();
/*SubType.prototype={
    getSubValue:function(){
        console.log(this.subproperty);
    },
    someOtherMethod:function(){
        return false;
    }
}*/
var a=new SubType();
a.getSuperValue();