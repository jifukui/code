const print=console.log;
{
    function add([x=1,y=2])
    {
        return x+y;
    }
    let a=1;
    let b=2;
    let data=`${a}+${b}=${a+b}hahah${add([4])}`;
    print(data);
}