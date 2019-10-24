const print=console.log;
{
    let s="aaaa__aaa__aa_a";
    let r1=new RegExp("a+",'g');
    let data;
    while(data=r1.exec(s))
    {
        print(data);
    }
    print("处理完成");
}
{
    let s="aaaa__aaa__aa_a";
    let r1=new RegExp("a+",'y');
    let data;
    while(data=r1.exec(s))
    {
        print(data);
    }
    print("处理完成");
}