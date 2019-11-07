const jiprint=console.log;
{
    function test(value:number):void;
    function test(value:string):void;
    function test(value:boolean):void;
    function test(value:number|string|boolean):void{
        switch (typeof value)
        {
            case 'boolean':
                {
                    let man:string=value?"man":"woman"
                    jiprint(`The sex is ${man}`);
                    break;
                }
            case 'number':
                {
                    jiprint(`Age is ${value}`);
                    break;
                }
            case 'string':
                {
                    jiprint(`Name is ${value}`);
                    break;
                }
            default:
                {
                    jiprint("have error");
                }
        }
    }
    let data={
        name:"hjkh",
        age:58,
        sex:false
    }
    test(data.name);
    test(data.age);
    test(data.sex);
    test(26);
}