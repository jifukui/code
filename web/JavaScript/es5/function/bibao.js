"use strict";
function fun1(value1,value2)
{
    console.log("this is "+JSON.stringify(this));
    console.log("arguments is "+JSON.stringify(arguments));
}
fun1(1,2);