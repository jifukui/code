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
function getownpropertydes(obj) {
    for(let key of Reflect.ownKeys(obj))
    {
        print(Object.getOwnPropertyDescriptor(obj,key));
    }
};
{
    const obj={
        foo:123,
        get bar(){return "abc"}
    };
    getownpropertydes(obj);
}