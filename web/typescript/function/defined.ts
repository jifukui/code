const jiprint=console.log;
{
    function greetname(name:string):string {
        if(name)
        {
            return `Hi! ${name}`;
        }
    }
    jiprint(greetname("jifukui"));
}