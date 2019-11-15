var jiprint = console.log;
{
    jiprint("一般的使用");
    /**传入的对象需要有一个label的属性且属性的类型为string类型 */
    function printlabel(label) {
        jiprint("The lablel is " + label.label);
    }
    var data = {
        size: 10,
        label: "test interface",
        name: "label interface"
    };
    var data1 = {
        size: 10,
        label: 1,
        name: "label interface"
    };
    printlabel(data);
    //printlabel(data1);//将会报错
}
{
    jiprint("可选属性");
    var Printf = function printlabel(label) {
        if (label.size) {
            jiprint("size is " + label.size);
        }
        jiprint("Label is " + label.label);
        if (label.name) {
            jiprint("Name is " + label.name);
        }
    };
    var data = {
        size: 10,
        label: "test interface",
        name: "label interface"
    };
    var data1 = {
        size: 10,
        label: "wudi ",
        name: "label interface"
    };
    var data2 = {
        size: 10,
        name: "label interface"
    };
    Printf(data);
    Printf(data1);
    //printlabel(data2);//报错缺乏定义的
}
{
    jiprint("只读属性的使用");
    var p1 = { x: 50, y: 32 };
    jiprint("(" + p1.x + "," + p1.y + ")");
    p1.y = 90;
    jiprint("(" + p1.x + "," + p1.y + ")");
}
{
    jiprint("索引属性的使用");
    var data = ["num1", "num2", "num3"];
    jiprint(data[0]);
    jiprint(data[1]);
    jiprint(data[2]);
}
