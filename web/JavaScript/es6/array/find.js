const print=console.log;
{
    let data=Array.of(1,4,-5,10);
    print(data.find((n)=>n<0));
}
{
    let data=Array.of(1,4,-5,10);
    print(data.findIndex((n)=>n<0));
}