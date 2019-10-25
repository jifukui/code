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
/**简单的克隆一个对象 */
{
    print("简单的克隆一个对象");
    let data={
        name:"test",
        age:16
    };
    let value={sex:"man"};
    Object.assign(value,data);
    print("设置数据前输出结果");
    objp(value);
    data.height=78;
    print("设置数据后");
    print("原始对象");
    objp(data);
    print("克隆的对象")
    objp(value);
}
/**克隆多个对象包含数据覆盖 */
{
    print("克隆多个对象包含数据覆盖");
    let data={
        name:"test",
        age:16
    };
    let data1={
        height:78,
        width:100,
        age:58
    }
    let value={sex:"man"};
    Object.assign(value,data,data1);
    objp(value);
}
/**克隆的对象包含对象，验证浅拷贝 */
{
    print("克隆的对象包含对象，验证浅拷贝");
    let data={
        name:"test",
        age:16
    };
    let data1={
        height:78,
        width:100
    }
    let data2={
        test:{in:1,out:2},
        code:"c++"
    }
    let value={sex:"man"};
    Object.assign(value,data,data1,data2);
    print("修改前");
    objp(value);
    data2.test.in=3;
    print("修改后");
    objp(value);
}
/**克隆的对象包含数组，验证数组的拷贝 */
{
    print("克隆的对象包含数组，验证数组的拷贝");
    let data={
        name:"test",
        age:16
    };
    let data1={
        height:78,
        width:100
    }
    let data2={
        test:[1,2,3,4,5,6]
    }
    let value={sex:"man"};
    Object.assign(value,data,data1,data2);
    print("修改前");
    objp(value);
    data2.test.push(10);
    print("修改后");
    objp(value);
}
/**取值函数的处理和一般函数的处理,函数貌似不是指针 */
{
    let out="good name"
    print("取值函数的处理和一般函数的处理,函数貌似不是指针");
    let data={
        name:"test",
        age:16,
        get function (){
            return 5;
        },
        value: function(){
            return out;
        }
    };
    let value={sex:"man"};
    Object.assign(value,data);
    out="Hello,World!";
    objp(value);
    print(value.value());
    data.value=function(){
        return "jifukui";
    }
    print(data.value());
    print(value.value());
}