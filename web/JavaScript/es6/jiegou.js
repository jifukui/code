/**数组 */
console.log("数组");
let [a,b,c]=[1,2,3]
console.log(a);
console.log(b);
console.log(c);
let [x,y]=[1]
console.log(x);
console.log(y);
{
    let [a,,c]=[1,2,3]
    console.log(a);
    console.log(c);
}
{
    let [a,...c]=[1,2,3]
    console.log(a);
    console.log(c);
}
{
    let [a,...c]=[1]
    console.log(a);
    console.log(c);
}
{
    let [a,c=4]=[1]
    console.log(a);
    console.log(c);
}
/**对象 */
console.log("对象");
{
    let {foo,bar}={foo:"aaaa",bar:"bbbbb"}
    console.log(foo);
    console.log(bar);
}
{
    let {foo:baz,num:bar}={baz:"aaaa",bar:"bbbb"}
    console.log(baz);
    console.log(bar);
    //console.log(foo);//error
    //console.log(num);//error
}
{
    let {foo:baz,num:bar}={foo:"aaaa",num:"bbbb"}
    console.log(baz);
    console.log(bar);
    //console.log(foo);//error
    //console.log(num);//error
}
/**对象的嵌套解构 */
{
    let obj={p:["Hello",{y:"World"}]};
    let {p:[x,{y}]}=obj;
    console.log(x);
    console.log(y);
}
{
    let obj={p:["Hello",{y:"World"}]};
    let {p,p:[x,{y}]}=obj;
    console.log(JSON.stringify(p));
}
{
    let {foo:foo=3,bar:bar=4}={foo:undefined,bar:null};
    console.log(foo);
    console.log(bar);
}
/**给存在的对象进行解构 */
{
    let a=9;
    //{a}={a:10}//error
    ({a}={a:10})
    console.log(a);
}
/***字符串的解构赋值 */
{
    let[a,b,c,d,e]="hello";
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
    let {length:len}="hello";
    console.log(len)
}
/**数值和布尔值的解构 */
{
    let {toString:a}=123;
    console.log(a.toString());
    let{toString:b}=true;
    console.log(b.toString());
}
/**函数参数的解构赋值 */
{
    function add([a,b])
    {
        return a+b;
    }
    let data=add([3,7]);
    console.log(data);
}
