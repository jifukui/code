const print=console.log;
{
    print("Key的使用")
    let data=Array.from('abcdefgfijk');
    for(let index of data.keys())
    {
        print(index)
    }
    /**values的使用 */
    print("values的使用");
    for(let value of data.values())
    {
        print(value);
    }
    print("entries的使用")
    for(let num of data.entries())
    {
        print(num);
    }
}