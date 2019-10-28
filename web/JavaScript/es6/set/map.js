const print=console.log;
{
    const m=new Map();
    const o={p:"Hello,world"};
    m.set(o,'content');
    print(m.get(o));
    print(m.has(o));
    print(m.has(o));
    print(m.has(o));
}
/**相同的值不同的地址 */
{
    print("相同的值不同的地址");
    const m=new Map();
    let a=[1];
    let b=[1];
    m.set(a,"k11111");
    m.set(b,"k222222");
    print(m.get(a));
    print(m.get(b));
    a[0]=2;
    print(m.get(a));
    print(m.size);
}