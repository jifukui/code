const jiprint=console.log;
{
    let add:(v1:number,v2:number,v3?:number)=>number;
    add=function name(v1:number,v2:number,v3?:number):number {
        let result;
        result=v1+v2;
        if(v3)
        {
            result+=v3;
        }
        return result;
    }
    jiprint(add(2,3,5));
    jiprint(add(9,14));
}