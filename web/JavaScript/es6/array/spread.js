const print=console.log;
{
    print(...[1,2,3,4]);
    function push(...item)
    {
        let array=[];
        array.push(...item);
        print(array);
        return array;
    }
    function add(value)
    {
        print(value);
        let data=0;
        for(let va of value)
        {
            data+=va;
        }
        return data;
    }
    print(add(push(...[1,2,3,4,5,6,7,8,9,10])));
}