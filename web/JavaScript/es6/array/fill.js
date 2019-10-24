const print=console.log;
{
    let data=Array.from("abcdefg");
    print(data);
    data.fill(7);
    print(data);
}
{
    let data=Array.from("abcdefg");
    print(data);
    data.fill(7,2);
    print(data);
}
{
    let data=Array.from("abcdefg");
    print(data);
    data.fill(7,2,4);
    print(data);
}