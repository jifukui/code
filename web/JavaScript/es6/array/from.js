const print=console.log;
{
    let value={
        0:'a',
        1:'b',
        2:'c',
        length:3
    };
    print(Array.from(value));
    print(Array.from("hello"));
}
{
    print(Array.from("123456789",x=>x*x));
}