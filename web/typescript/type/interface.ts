const jiprint=console.log;
{
    jiprint("一般的使用");
    interface Label{
        label:string;
    }
    /**传入的对象需要有一个label的属性且属性的类型为string类型 */
    function printlabel(label:Label)
    {
        jiprint("The lablel is "+label.label);
    }
    let data={
        size:10,
        label:"test interface",
        name:"label interface"
    }
    let data1={
        size:10,
        label:1,
        name:"label interface"
    }
    printlabel(data);
    //printlabel(data1);//将会报错
}
{
    jiprint("可选属性");
    interface Label{
        label:string;
        size?:number;
        name?:string;
    }
    let Printf =function printlabel(label:Label)
    {
        if(label.size)
        {
            jiprint(`size is ${label.size}`);
        }
        jiprint(`Label is ${label.label}`);
        if(label.name)
        {
            jiprint(`Name is ${label.name}`);
        }
    }
    let data={
        size:10,
        label:"test interface",
        name:"label interface"
    }
    let data1={
        size:10,
        label:"wudi ",
        name:"label interface"
    }
    let data2={
        size:10,
        name:"label interface"
    }
    Printf(data);
    Printf(data1);
    //printlabel(data2);//报错缺乏定义的

}
{
    jiprint("只读属性的使用");
    interface Point{
        readonly x:number;
        y:number;
    }
    let p1:Point={x:50,y:32};
    jiprint(`(${p1.x},${p1.y})`);
    p1.y=90;
    jiprint(`(${p1.x},${p1.y})`);
}
{
    jiprint("索引属性的使用");
    interface Point{
        [index:number]:string;
    }
    let data:Point=["num1","num2","num3"];
    jiprint(data[0]);
    jiprint(data[1]);
    jiprint(data[2]);
}