console.log(Number.MIN_VALUE);//最小数
console.log(Number.MAX_VALUE);//最大数
console.log(Number.NEGATIVE_INFINITY);//正无穷数
console.log(Number.POSITIVE_INFINITY);//负无穷数
console.log(Number.MIN_SAFE_INTEGER);//最小整数
console.log(Number.MAX_SAFE_INTEGER);//最大整数
var a =Number.NEGATIVE_INFINITY;//定义一个无穷数
console.log(isFinite(a));//判断数据是否是无穷数，是无穷数返回flase不是返回true
/**r如果值不相等的无穷数相等性为false反之数值相等的无穷数相等性为相等 */
var b=Number.MAX_VALUE+Number.MIN_VALUE;
if(a==b)
{
    console.log("equal");
}
else
{
    console.log("no equal");
}
var c=Number.MAX_VALUE+Number.MIN_VALUE;
if(c==b)
{
    console.log("equal");
}
else
{
    console.log("no equal");
}
/**NAN */
console.log("NAN")
b=NaN;
c=b;
/**任意NAN值的数据都不相等 */
if(c==b)
{
    console.log("equal");
}
else
{
    console.log("no equal");
}
/**对NAN型数据做任务处理数据仍为NAN */
var d=c-1;
console.log(isNaN(d))
/**Number函数 */
console.log("Number 函数");
console.log(Number(false));
console.log(Number(true));
console.log(Number(null));
console.log(Number(""));
console.log(Number("123"));
console.log(Number("0x10"));
console.log(Number("r123"));
var data={
    a:100,
    b:"70"
};
console.log(Number(data.a));
console.log(Number(data.b));
/***parseInt */
console.log("parseInt");
console.log(parseInt(false));
console.log(parseInt(true));
console.log(parseInt(""));
console.log(parseInt("123"));
console.log(parseInt("0x10"));
console.log(parseInt("x123"));
console.log(parseInt("0123"));
console.log(parseInt("100",2));
console.log(parseInt("123",10));
console.log(parseInt("123",8));
console.log(parseInt("123",16));
