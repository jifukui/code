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
    let value=new Proxy(data.ji,{
        apply:function(target,data,value)
        {
            print("apply "+value);
            return "jifukui"
        }
    });
    data.ji(5);
    let b={a:3,b:9};
    print(value.call(b,b.b))
    print(value.apply(b,[b.b]));
    print(value.bind(b,4)());
}
{
    print("Has的使用");
    let a={a:1,b:2,c:3};
    let value=new Proxy(a,{
        has:function(target,key){
            print(`The data is ${key}`);
            return false;
        }
    })
    print('a' in value);
}
{
    print("construct的使用");
    let value=new Proxy(function(){},{
        construct:function(targer,args)
        {
            print(`args is ${JSON.stringify(args)}`);
            return {x:1,y:2};
        }
    })
    let a=new value({a:1,b:2});
    print(JSON.stringify(a));
    let b=new value([1,2,3]);
    print(JSON.stringify(b));
    let c=new value("jifukui nice");
    print(JSON.stringify(c));
}
{
    print("deleteProperty的使用");
    let key={
        name:"guandian",
        age:12,
        title:"sb"
    }
    let value =new Proxy(key,{
        deleteProperty:function(target,key)
        {
            print(`key is ${key}`);
            return false;
        }
    })
    print(delete value.age);
}
