const print=console.log;
{
    let key={
        name:"guandian",
        age:12,
        title:"sb",
    };
    print(Reflect.deleteProperty(key,"name"));
    for(let i in key)
    {
        print(`key ${i} value is ${key[i]}`);
    }

}