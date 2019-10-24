const print=console.log;
{
    let data=/\w/;
    print(data.flags);
    data=new RegExp('\\w',"i");
    print(data.flags);
    data=new RegExp('\\w',"ig");
    print(data.flags);
    data=new RegExp('\\w',"igu");
    print(data.flags);
    data=new RegExp('\\w',"igum");
    print(data.flags);
}