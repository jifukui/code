const print=console.log;
{
    print("Get 方法的使用");
    let key={
        name:"guandian",
        age:12,
        title:"sb",
        get name(){
            return `${this.age} + Hello,World`
        }
    }
    print(Reflect.get(key,"name"));
    print(Reflect.get(key,"sex"));
}