const print=console.log;
{
    function *fun(){
        yield 'a'
        yield 'b'
        yield 'c'
        yield 'd'
        yield 'e'
        yield 'f'
        yield 'g'
        yield 'h'
        return 'k'
    }
    for(let i of fun())
    {
        print(`${i}`)
    }
}