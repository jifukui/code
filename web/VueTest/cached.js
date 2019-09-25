function cached (fn) 
{
    console.log("2")
    var cache = Object.create(null);
    return (
    function cachedFn (str) 
    {
        console.log("DATA "+str)
        var hit = cache[str];
        console.log("hit is "+JSON.stringify(hit))
        return hit || (cache[str] = fn(str))
    }
  )

}
var camelizeRE = /-(\w)/g;
var camelize = cached(
    function (str) 
    {
        console.log("camelize "+str);
        return str.replace(camelizeRE, function (_, c) 
        { 
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
//console.log(capitalize("jifukui"))
console.log(hyphenate(" JIfukui"));
console.log(hyphenate(" GOodGame"));
//console.log(camelize("jifukui"))
//console.log(camelize("jifukui"))