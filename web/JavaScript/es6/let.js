{
    let a=5;
    var b=6;
    console.log("a is "+a);
    console.log("b is "+b);
}
//console.log("a is "+a);
console.log("b is "+b);

var c=[]
for(let i=0;i<10;i++)
{
    c[i]=function()
    {
        console.log("i is "+i);
    }
}
c[6]();
var y=4;
// let y=7;
// function bar(x=y,y=2)
// {
//     return [x,y]
// }
function bar(x=2,y=x)
{
    return [x,y]
}
console.log(bar());
function f()
{
    console.log("out")
}
(function(){
    function f(){console.log("in")}
    f();
}() );