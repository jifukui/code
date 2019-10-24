const print=console.log;
/**trunc 返回数据的整数部分 */
{
    print("trunc 返回数据的整数部分");
    print(Math.trunc(4));
    print(Math.trunc(4.999));
    print(Math.trunc(4.45));
    print(Math.trunc(-4));
    print(Math.trunc(-4.0001));
}
/**sign 返回数据是正数还是负数还是0 */
{
    print("sign 返回数据是正数还是负数还是0");
    print(Math.sign(100));
    print(Math.sign(-100));
    print(Math.sign(-00));
    print(Math.sign(+00));
    print(Math.sign(0));
}
/**cbrt 计算一个数的立方根 */
{
    print("cbrt 计算一个数的立方根");
    print(Math.cbrt(27));
    print(Math.cbrt(1));
    print(Math.cbrt(-1));
}
/**clz32 返回一个数据无符号形式的二进制值前面有多少个0*/
{
    print("clz32 返回一个数据无符号形式的二进制值前面有多少个0");
    print(Math.clz32(1));
    print(Math.clz32(65535));
}
/**imul 返回两个数相乘的32位有符号的数 */
{
    print("imul 返回两个数相乘的32位有符号的数");
    print(Math.imul(2,-9));
}
/**fround 返回一个数的单精度浮点数的形式 */
{
    print("fround 返回一个数的单精度浮点数的形式");
    print(Math.fround(0.1));
    print(Math.fround(0.2));
    print(Math.fround(0.3));
    print(Math.fround(0.1+0.2));
}
/**hypot 返回所有参数平方和的平方根 */
{
    print("hypot 返回所有参数平方根的和")
    print(Math.hypot(3,4));
    print(Math.hypot(9,4,1));
}   
/**expm1 返回e的x方-1的值 */
{
    print("expm1 返回e的x方-1的值");
    print(Math.expm1(1));
    print(Math.expm1(-1));
}
/**log1p 返回log(x+1)的值 */
{
    print("log1p 返回log(x+1)的值");
    print(Math.log1p(1));
}
/**log10 返回log10(x)的值 */
{
    print("log10 返回log10(x)的值");
    print(Math.log10(10));
}
/**log2 返回log2(x)的值 */
{
    print("log2 返回log2(x)的值");
    print(Math.log2(4));
}
/**指数运算 */
{
    print("指数运算");
    print(2**2);
    print(2**3);
    print(2**4);
}