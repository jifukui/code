function cached (fn) 
{
    console.log("2");
    console.log(fn);
    var cache= Object.create(null);
    return (
    function cachedFn (str) 
    {
        console.log("DATA "+str)
        var hit = cache[str];
        console.log("Now The chahe is "+JSON.stringify(cache));
        return hit || (cache[str] = fn(str))
    }
  )

}
var camelizeRE = /-(\w)/g;
var camelize = cached(
    function (str) 
    {
        console.log("camelize "+str);
        /**replace 的第二个参数是一个回调函数第一个数据是整体匹配到的数据第二个参数是匹配到的分组 */
        return str.replace(camelizeRE, function (_, c) 
        { 
            console.log("this");
            console.log("_ is "+_);
            console.log("c is "+c);
            return c ? c.toUpperCase() : ''; 
        })
    }
);

var capitalize = cached(function (str) 
{
    console.log("capitalize "+str);
    return str.charAt(0).toUpperCase() + str.slice(1)
});

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) 
{
    console.log("hyphenate str is "+str);
    return str.replace(hyphenateRE, '-$1').toLowerCase()
});
console.log(camelize);
console.log(capitalize);
console.log(hyphenate);
function Display(str){
    console.log("display "+str);
}
var a=camelize("-display");
console.log("a is "+a);
var b=camelize("-display");
console.log("b is "+b);
var c=camelize("-qqq");
console.log("c is "+c);
var d=camelize("-ee-e");
console.log("d is "+d);
var e=camelize("ewre");
console.log("e is "+e);
var f=camelize("wwewre");
console.log("f is "+f);