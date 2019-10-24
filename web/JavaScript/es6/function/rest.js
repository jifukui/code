const print=console.log;
{
    function add(...value)
    {
        let num=0;
        for(let data of value)
        {
            num+=data;
        }
        print(num);
    }
    add(1,2,3,4,5,6,7,8,9,10);
}