const print=console.log;
{
    let a="\u0061";
    print(a);
}
/**表示超出的部分 */
{
    let a="\uD842\uDFB7";
    print(a);
}
/**使用大括号进行表示 */
{
    let a="\u{0061}";
    print(a);
    let b="\u{20BB7}"
    print(b);
}