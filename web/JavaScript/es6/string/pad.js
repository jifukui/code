const print=console.log;
{
    let a="abcd";
    print(a.padStart(6,"1234"));
    print(a.padEnd(6,"1234"));
    print(a.padStart(3,"1234"));
    print(a.padEnd(3,"1234"));
    print(a.padStart(6));
    print(a.padEnd(6));
    print(a.padStart(16,"1234"));
    print(a.padEnd(16,"1234"));
}