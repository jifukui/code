"use strict";
import "../css/index.css";
import "../less/index.less";
function jifukui(){
    var a = document.getElementById("app");
    var b = document.createElement("div");
    var c = document.createElement("button");
    var t=document.createTextNode("Hello jifukui");
    var s=document.createTextNode("click me");
    b.appendChild(t);
    c.appendChild(s);
    a.appendChild(b);
    a.appendChild(c);
}
jifukui();