"use strict";
import "../css/index.css";
import "../less/index.less";
import left from "../img/left.png";
function jifukui(){
    var a = document.getElementById("app");
    var b = document.createElement("div");
    var c = document.createElement("button");
    var d = document.createElement("img");
    var t=document.createTextNode("Hello jifukui");
    var s=document.createTextNode("click me");
    b.appendChild(t);
    c.appendChild(s);
    d.src = left;
    a.appendChild(b);
    a.appendChild(c);
    a.appendChild(d);
}
jifukui();