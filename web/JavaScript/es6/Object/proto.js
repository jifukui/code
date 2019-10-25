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
/**一个简单的实验 */
{
    print("一个简单的实验");
    let data=Object.create(null);
    print(Reflect.ownKeys(data));
    let val1={name:"ddd",age:45};
    Object.setPrototypeOf(data,val1);
    print(Reflect.ownKeys(data));
    objp(data);
    print(Object.getPrototypeOf(data));
}