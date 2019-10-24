const print=console.log;
{
    let data=Array.from("123456789");
    print(data);
    print(data.includes('8'));
    print(data.includes('12'));
    print(data.includes('2',3));
    print(data.includes('2',1));
}