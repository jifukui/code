const print=console.log;
/**前向断言 只匹配%号之前的数字*/
{
    print("前向断言 只匹配%号之前的数字")
    let a1=new RegExp('\\d+(?=%)');
    print(a1.exec("100%"));
    print(a1.exec("100"));
    print(a1.exec("%100"));
}
/**前向否定 匹配不在%号之前的数字*/
{
    print("前向否定 匹配不在%号之前的数字");
    //let a1=new RegExp('\\d+(?!%)');
    let a1=/\d+(?!%)/
    print(a1.exec("100%"));
    print(a1.exec("100"));
    print(a1.exec("%100"));
    print(a1.exec("1%"));
    print(a1.exec("1%1"));
}
/**后向断言 匹配%后面的数字*/
{
    print("后向断言 匹配%后面的数字")
    let a1=new RegExp('(?<=%)\\d+');
    print(a1.exec("100%"));
    print(a1.exec("10%0"));
    print(a1.exec("%100"));
}
/**后向否定 匹配不在%号后面的数字*/
{
    print("后向否定 匹配不在%号后面的数字");
    let a1=new RegExp('(?<!%)\\d+');
    print(a1.exec("www"));
    print(a1.exec("10%0"));
    print(a1.exec("%100"));
}