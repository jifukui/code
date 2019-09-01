var i=0;
function timeout(val)
{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,val)
    })
}

console.log(new Date,i);
for(i=0;i<5;i++)
{
    timeout(1000).then(()=>{
        console.log(new Date,i);        
    })
}


//timeout(5000)
