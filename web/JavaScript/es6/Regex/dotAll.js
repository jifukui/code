const print=console.log;
{
    let data="1\n2";
    let reg=new RegExp('1.2');
    print(reg.test(data));
    print(reg.flags);
    reg=new RegExp('1.2','s');
    print(reg.flags);
    print(reg.test(data));
}