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