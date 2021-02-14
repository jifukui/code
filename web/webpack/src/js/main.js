"use strict";
import "../css/index.css";
// import "../less/index.less";
function jifukui(){
    var a = document.getElementById("app");
    var b = document.createElement("div");
    var t=document.createTextNode("Hello jifukui");
    b.appendChild(t);
    a.appendChild(b);
}
jifukui();