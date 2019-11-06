const print=console.log;
{
    function timeout(ms){
        return new Promise((resolve)=>
        {
            setTimeout(resolve,ms);
        });
    }
    async function asyncPrint(value,ms){
        await timeout(ms);
        print(value);
    }
    asyncPrint("data",2000);
}