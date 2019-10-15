"use strict";
var a=1;
(function(data){
    var num=2;
    console.log(num);
    console.log("this data "+data);
}(a++));
console.log(a);
console.log("jifukui")