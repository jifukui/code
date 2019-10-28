const print=console.log;
{
    let n1=Symbol("foo");
    let n2=Symbol("foo");
    let n3=Symbol.for("foo");
    let n4=Symbol.for("foo");
    print(n1===n2);
    print(n1===n3);
    print(n3===n2);
    print(n3===n4);
}
{
    let n1=Symbol("foo");
    let n2=Symbol("foo");
    let n3=Symbol.for("foo");
    let n4=Symbol.for("foo");
    print(n1==n2);
    print(n1==n3);
    print(n3==n2);
    print(n3==n4);
}