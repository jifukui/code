const jiprint=console.log;
{
    let add:(...arr:number[])=>number;
    add=function name(...arr:number[]):number {
        let result:number=0;
        for(let i=0 ;i<arr.length;i++)
        {
            result+=arr[i];
        }
        return result;
    }
    jiprint(add(1));
    jiprint(add(1,2));
    jiprint(add(1,2,3));
    jiprint(add(1,2,3,4));
    jiprint(add(1,2,3,4,5));
}
{
    let add:(arr:number[])=>number;
    add=function name(arr:number[]):number {
        let result:number=0;
        for(let i=0 ;i<arr.length;i++)
        {
            result+=arr[i];
        }
        return result;
    }
    jiprint(add([1]));
    jiprint(add([1,2]));
    jiprint(add([1,2,3]));
    jiprint(add([1,2,3,4]));
    jiprint(add([1,2,3,4,5]));
}