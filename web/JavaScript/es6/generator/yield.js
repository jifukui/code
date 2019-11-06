const print=console.log;
{
    function *data(params) 
    {
        let x;x=(yield params); print(`data us ${params+1}`);
        yield x+1
        return "over"
    }
    let fn=data(9);
    print(fn.next(3))
    print(fn.next(7))
    print(fn.next(1))
}