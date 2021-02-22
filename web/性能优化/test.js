let a="192.168.020.147"
function SetIPAddress(value)
{
    let data=value.split(".");
    let val=new Array();
    for(let i=0;i<data.length;i++)
    {
        val[i]=parseInt(data[i])
    }
    return val.join(".")
    
}
let b=SetIPAddress(a);
console.log("b is "+b);