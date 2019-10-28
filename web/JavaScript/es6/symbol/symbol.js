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
/**Symbol遍历,遍历Symbol属性和常规属性 */
{
    print("Symbol遍历,遍历Symbol属性和常规属性");
    let a=Symbol("dwe");
    let b=Symbol("dsds");
    let c=Symbol("dwe");
    let data={};
    data[a]="hello1";
    data[b]="hello2";
    data[c]="hello3";
    data.a="Hello4";
    print(data[a]);
    print(data.a);
    print(data[b]);
    print(data[c]);
    print(Object.getOwnPropertySymbols(data));
    print(Object.getOwnPropertyNames(data));
    for(let i in data)
    {
        print(`${i} is ${data[i]}`);
    }
    print(Reflect.ownKeys(data));
}
/**hasInstance */
{
    print("hasInstance的使用");
    class My{
        [Symbol.hasInstance] (foo){
            return foo instanceof Array;
        }
    }
    let a=[1,2,3,4,5];
    //let b=New My();
    print(a instanceof new My());
}
/**isConcatSpreadable */
{
    print("isConcatSpreadable的使用");
    let a =[1,2,3];
    print(a.concat([4,5,6]));
    a[Symbol.isConcatSpreadable]=false;
    print(a.concat([7,8,9],[10,11,12]));
    let a1=['c','d'];
    print(['a','b'].concat(a1,['e','f']));
    let a2=['c','d'];
    a2[Symbol.isConcatSpreadable]=false;
    print(['a','b'].concat(a2,['e','f']));
}
/**species的使用 */
{
    print("species的使用");
    class myarray extends Array{
        static get [Symbol.species](){
            return Array;
        }
    }
    let a =new myarray(1,2,3);
    let mapped=a.map(x=>x*x);
    print(mapped instanceof myarray);
    print(mapped instanceof Array);
}
/**match的使用 */
{
    class mymatch{
        [Symbol.match](string){
            //return "Hello,World".indexOf(string);
            print("this is match")
        }
    }
    //print('e'.match(new mymatch));
    'e'.match(new mymatch());
}