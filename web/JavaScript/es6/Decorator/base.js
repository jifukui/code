const print=console.log;

@testable
class mytest{
    name:"love"
};
function testable(target){
    target.isTestable=true;
}
print(mytest.isTestable);
