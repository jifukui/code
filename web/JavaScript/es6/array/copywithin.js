const print=console.log;
{
    let data=Array.of(1,2,3,4,5,6,7,8,9,10);
    data.copyWithin(0,2,4);
    print(data);
}
{
    let data=Array.of(1,2,3,4,5,6,7,8,9,10);
    data.copyWithin(0,2);
    print(data);
}
{
    let data=Array.of(1,2,3,4,5,6,7,8,9,10);
    data.copyWithin(0,2,2);
    print(data);
}