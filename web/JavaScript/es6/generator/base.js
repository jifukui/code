const print=console.log;
{
    function *helloworld()
    {
        yield 'hello';
        yield 'world';
        return 'ending';
    }
    let hw=helloworld();
    print(hw.next());
    print(hw.next());
    print(hw.next());
    print(hw.next());
}
