const print=console.log;
{
    print("简单的使用箭头函数");
    var f=v=>{
        print("这个是箭头函数啊"+v);
    }
    f(8);
}
/**带参数 */
{
    print("这里需要带参数");
    let f=(x=1,y=2)=>{
        print(x+y);
    }
    f();
    f(5);
    f(4,9);
}
/**this的使用 */
{
    print("this的使用 ");
    function foo(){
        setTimeout(()=>{
            print('id:',this.id);
        },100);
    }
    var id=45;
    foo.call({id:56});
}