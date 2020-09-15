const {spawn}=require('child_process');
//调用子进程
const ls=spawn('ipconfig',['\/all']);
ls.stdout.on('data',(data)=>{
    console.log(`stout:${data}`);
});
ls.stderr.on('data',(data)=>
{
    console.error(`stderr ${data}`);
})
//监听程序退出以及退出代码
ls.on('close',(code)=>{
    console.log(`子进程退出程序 ${code}`);
})