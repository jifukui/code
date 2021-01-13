const os = require("os");
//操作系统的行末标志
if(os.EOL=="\r\n"){
    console.log("the end is \\r \\n")
}else(
    console.log("the end is \\n")
)
//操作系统的架构
console.log(`the cpu arch is ${os.arch()}`)
//操作系统的特定信息
console.log("the info is ")
console.dir(os.constants);
console.dir(os.constants.dlopen);
//cpu信息
console.log("the cpu info");
console.dir(os.cpus())
//系统的大小端模式
console.log(`the os end is ${os.endianness}`);
//空闲的内存量
console.log(`the free cpu info is ${os.freemem()/1024/1024}MBytes`);
//获取指定进程的运行优先级0表示自己，可以在指定特定的进程
console.log(`the my Priority ${os.getPriority(0)}`)
//获取当前用户的目录
console.log(`the home is ${os.homedir()}`);
//获取当前设备的主机名
console.log(`the hostname is ${os.hostname()}`);
//平均负载
console.log(`the load is ${os.loadavg()}`);
//网络信息
console.log(`the network is `);
console.dir(os.networkInterfaces());
//操作系统
console.log(`the os is ${os.platform()}`);
//发布版本
console.log(`the release is ${os.release()}`);
//设置程序的优先级
os.setPriority(10);
console.log(`the my Priority ${os.getPriority(0)}`);
//临时文件目录
console.log(`the dir is ${os.tmpdir()}`);
//总的内存大小
console.log(`total memtory is ${os.totalmem/1024/1024}MBytes`)
//操作系统类型
console.log(`os type is ${os.type()}`);
//系统正常运行时间
console.log(`the os run time is ${os.uptime()/60/60}hours`);
//用户信息
console.log(`the userinfo is `)
console.dir(os.userInfo('utf-8'));
//版本信息
console.log(`the version is ${os.version()}`)