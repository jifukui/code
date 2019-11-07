const {spawn}=require('child_process');
const ls=spawn('ipconfig',['\/all']);
ls.stdout.on('data',(data)=>{
    console.log(`stout:${data}`);
});
ls.stderr.on('data',(data)=>
{
    console.error(`stderr ${data}`);
})
ls.on('close',(code)=>{
    console.log(`子进程退出程序 ${code}`);
})