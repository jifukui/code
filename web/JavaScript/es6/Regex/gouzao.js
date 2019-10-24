const print=console.log;
{
    let data=new RegExp("\\w","i");
    print(data.test("www"));
    print(data.test("123"));
    print(data.test("$$$"));
    print(data.test("22___"));
    print(data.test("goood"));
    print("over has");
}
/**重定义正则表达式 */
{
    let data=/w/;
    print(data.test("www"));
    print(data.test("WWW"));
    data=new RegExp("\\w","i");
    print(data.test("www"));
    print(data.test("WWW"));
    print("over has");
}
/**replace方法的使用 */
{
    let data=new RegExp("\\w","ig");
    let value="test&&&jiufkui"
    let newvalue=value.replace(data,"+");
    print(newvalue);
    print("over has");
}
/**match的使用 */
{
    
}