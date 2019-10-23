const print=console.log;
{
    function tag(arr,v1,v2)
    {
        let {length:len}=arr;
        print(len);
        let i;
        for(i=0;i<len;i++)
        {
            print(arr[i]);
        }
        print(v1);
        print(v2);
    }
    let a=10;
    let b=5;
    tag `Hello${a}${b}${a+b}World`;
}
{
    function tag(arr,v1,v2)
    {
        let {length:len}=arr;
        print(len);
        let i;
        for(i=0;i<len;i++)
        {
            print(arr[i]);
        }
        print(v1);
        print(v2);
    }
    let a=10;
    let b=5;
    tag `Hello1${a}2${b}3${a+b}4World`;
}
{
    let total=30;
    let msg=passthru`The total is  ${total}  (${total*1.05} with tax)`;
    function passthru(data)
    {
        let result='';
        let i=0;
        print(data.length);
        print(arguments.length);
        while(i<data.length)
        {
            //print("data "+i+data[i])
            result+=data[i++];
            if(i<arguments.length)
            {
                //print("argument "+i+arguments[i]);
                result+=arguments[i];
            }
        }
        print(result);
    }
}