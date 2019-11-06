const print=console.log;
{
    let arry=[1,2,3,4,5,6,7,8];
    let lter=arry[Symbol.iterator]();
    print(lter.next());
    print(lter.next());
    print(lter.next());
    print(lter.next());
    print(lter.next());
    print(lter.next());
    print(lter.next());
    print(lter.next());
    print(lter.next());
}