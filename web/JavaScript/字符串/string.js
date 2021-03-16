"use strict";
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference
//http://www.linuxfromscratch.org/blfs/view/svn/index.html
let print = console.log;
const type = Object.prototype.toString;
{
    print("字符串的长度属性");
    let str = "dgajkhsakjldhhfgjh";
    print(`str is ${str} and length is ${str.length}`)
}
{
    print("字符串的charAt()方法");
    //返回指定位置的字符,返回字符串形式
    let str = "dsdjkshlhjkl";
    let ch = str.charAt(0)
    print(`value is ${ch} and type is ${type.call(ch)}`)
}
{
    print("字符串的charCodeAt()方法");
    //返回指定位置的Unicode值,返回的是数字形式
    let str = "dsdjkshlhjkl";
    let ch = str.charCodeAt(0)
    print(`value is ${ch} and type is ${type.call(ch)}`)
}
{
    print("字符串的codePointAt()方法");
    //返回指定位置的UTF-16的值,返回的是数字形式
    let str = "dsdjkshlhjkl";
    let ch = str.codePointAt(0);
    print(`value is ${ch} and type is ${type.call(ch)}`)
}
{
    print("字符串的concat()方法");
    //返回值为连个字符串拼接起来的结果，但是还是建议使用+
    let str = "dsdjkshlhjkl";
    let ch = str.concat(";hello,this is jifukui")
    print(`value is ${ch} and str value is ${str}`)
}
{
    print("字符串的includes()方法");
    //返回数据中是否有这个字符串，返回真假值
    let str = "dsdjkshlhjkl";
    let ch = str.includes("a");
    let ch1 = str.includes("j");
    print(`value is ${ch} and another value is ${ch1}`)
}
{
    print("字符串的includes()方法");
    //返回数据中是否有这个字符串，返回真假值
    let str = "dsdjkshlhjkl";
    let ch = str.includes("a");
    let ch1 = str.includes("j");
    print(`value is ${ch} and another value is ${ch1}`)
}