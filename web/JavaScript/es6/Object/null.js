const print=console.log;
/**对象属性,这个现在好像不支持 */
{
    let data={
        a:{
            b:{
                c:{
                    d:7,
                }
            }
        }
    };
    print(data.a.b.c.d);
    let num1=data?.a?.b?.c?.d
    //print(data?.a);
    //print(data?.a?.b);

}