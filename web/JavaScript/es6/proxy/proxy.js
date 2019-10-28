const print=console.log;
{
    print("简单的示例");
    let obj=new Proxy({},
    {
        get:function(target,key,receiver){
            print(`Getting ${key}  `);
            if(key==='name')
            {
                return "guandian"
            }
            else
            {
                return "sb"
            }
        },
        set:function(target,key,receiver){
            print(`Setting ${key} `);
        }
    });
    print(obj.a);
    print(obj.name)
    obj.b=9;
}
{
    print("Get 的修改")
    let data={
        a:1,
        b:2
    };
    let value=new Proxy(data,{
        get:function(target,property){
            return "jdhjh";
        }
    });
    print(value.a);
}
{
    print("Set 的修改")
    let data={
        a:1,
        b:2
    };
    let value=new Proxy(data,{
        set:function(target,property,value){
            target[property]=`Good Job ${value}`;
        }
    });
    print(value.a);
    value.data=7;
    print(value.data);
}
{
    print("apply的使用");
    let data={
        a:1,
        b:2,
        ji:function(value)
        {
            print(value);
        }
    };
    let value=new Proxy(data,{
        apply:function(target,data,value){
            print("apply "+value);
        }
    });
    //data();
    data.ji(5);
    let b=7;
    data.ji.apply(8);
}