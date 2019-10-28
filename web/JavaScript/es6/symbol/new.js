const print=console.log;
/**创建一个简单的symbal对象 */
{
    print("创建一个简单的symbal对象");
    let a=Symbol("foo");
    print(typeof a);
    print(a);
}
/**给一个对象添加两个同名的symbol属性 */
{
    print("给一个对象添加两个同名的symbol属性");
    let data={};
    let n1="foo";
    let n2=Symbol("foo");
    let n3=Symbol("foo");
    data[n1]="data1";
    data[n2]="data2";
    data[n3]="data3";
    print(Object.getPrototypeOf(data));
    print(Object.keys(data));
    print(Reflect.ownKeys(data));
    print(data.foo);
    print(data[n2]);
    print(data[n3]);
}