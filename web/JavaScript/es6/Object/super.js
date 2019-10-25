const print=console.log;
function objp(obj) {
    for(let data in obj)
    {
        if(Object.prototype.toString.call(obj[data])==='[object Object]')
        {
            print(`---------${data}-------------`)
            objp(obj[data]);
        }
        else
        {
            print(`${data} is ${obj[data]}`);
        }
    }
};
/**super的简单使用,super参数只能在对象的方法中使用在其他地方使用错误 */
{
    print("super的简单使用");
    let data={
        foo:"hahahahha",
        value:"enenenen"
    };
    
    let obj={
        out() {
            print(super.foo);
            print(super.value);
        }
    };
    Object.setPrototypeOf(obj,data);
    print(Object.getPrototypeOf(obj));
    obj.out();
    obj.foo="jifukui";
    obj.out();
    print("获取原型属性");
    print(Object.getPrototypeOf(obj));
    print("获取所有属性");
    print(Reflect.ownKeys(obj));
    print(obj.foo);
}