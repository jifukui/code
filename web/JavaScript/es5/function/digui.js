"use strict";
function fun1(num)
{
    if(num<=1)
    {
        return 1;
    }
    else
    {
        return num*fun1(num-1);
    }
}
console.log(fun1(4));