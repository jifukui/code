var gulp=require("gulp");
gulp.task("jifukui",async()=>{
    console.log("Hello,this is jifukui ");
});
gulp.task("test",done=>{
    console.log("Hello,this is test");
    done();
})