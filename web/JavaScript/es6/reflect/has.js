const print=console.log;
{
    let key={
        name:"guandian",
        age:12,
        title:"sb",
    }
    print(Reflect.has(key,"name"));
    print(Reflect.has(key,"sex"))
}