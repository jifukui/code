const print=console.log;
{
    let key={
        name:"guandian",
        age:12,
        title:"sb",
        set ji(value)
        {
            print(` value is ${value}`);
            //return this.name=value;
            return this.name=value
        },
    }
    let baf={name:"xxxxx"};
    print(key.name);
    print(baf.name);
    Reflect.set(key,"name","guandianshigesb",baf);
    print(key.name)
    print(baf.name)
}