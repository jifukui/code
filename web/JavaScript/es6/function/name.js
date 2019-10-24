const print=console.log;
{
    print("函数的name属性");
    function add(x,y=1) {
        return;
    }
    function add1(x,y=1,z) {
        return;
    }
    function add2(x,x1,y=1,z,z1=4) {
        return;
    }
    print(add.name);
    print(add1.name);
    print(add2.name);
}