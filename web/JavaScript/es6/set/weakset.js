const print=console.log;
{
    let data=[[1,2],[3,4]]
    //let data=[1,2];
    let data1={
        name:"ji",
        age:45
    }
    let a=new WeakSet(data);
    a.add(data1);
    print(a);
}