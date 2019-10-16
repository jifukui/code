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
    // console.log(foo);
    console.log(baz);
    console.log(bar);
}