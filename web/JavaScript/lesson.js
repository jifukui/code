let studymenu=document.getElementsByClassName("course_study_sonmenu");
let i=0;
function Lesson() {
    let a=document.getElementsByClassName("layui-layer-btn0");
    if(a.length>0){
        a=a[0];
        a.click();
    } 
}
let timer = setInterval(Lesson,5000);
let studyend=document.getElementById("studymovie");
studyend.addEventListener("ended",function () {
    console.log("have end the "+i);
    i++;
    if(i<studymenu.length)
    {
        study(i);
    }else{
        alert("学习结束");
    }
    
});
function study() {
    studymenu[i].children[0].click();
}
//study();