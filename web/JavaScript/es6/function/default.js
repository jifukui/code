const print=console.log;
/**使用默认值 */
{
    print("默认参数");
    function name(x="Hello",y="World") {
        print(x+y);
    }
    name("ji");
    name(null,"haha");//输出nullhaha没有使用默认值
    name(undefined,"haha");
}
/**默认值和解构的联合使用 */
{
    print("默认值和解构的联合使用");
    function add({x,y=7}) {
        print(x+y);
    }
    add({x:1});
    add({z:9});
    add({x:1,y:9});
    add({y:8});
}
/**返回函数没有指定默认参数的个数,即第一个默认参数前的未定义默认参数的个数 */
{
    print("返回函数没有指定默认参数的个数,即第一个默认参数前的未定义默认参数的个数")
    function add(x,y=1) {
        return;
    }
    function add1(x,y=1,z) {
        return;
    }
    function add2(x,x1,y=1,z,z1=4) {
        return;
    }
    print(add.length);
    print(add1.length);
    print(add2.length);
}