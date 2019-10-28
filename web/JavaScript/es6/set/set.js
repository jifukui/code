const print=console.log;
{
    let a=new Set([1,2,2,2,3]);
    print(a);
    print(a.size);
    print(a.add(9));
    print(a.has(5));
    print(a.has(3));
    print("keys方法")
    for(let i of a.keys())
    {
        print(i);
    }
    print("value方法");
    for(let i of a.values())
    {
        print(i);
    }
    print("entris方法")
    for(let i of a.entries())
    {
        print(i);
    }
    print("for of 方法的使用")
    for(let i of a)
    {
        print(i);
    }
    print("foreach的使用");
    a.forEach((x)=>{print(x)});
    print("map的使用");

}