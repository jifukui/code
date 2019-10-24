const print=console.log;
/**实验1创建简单的promise函数 */
{
    print("实验1创建简单的promise函数");
    let promise=new Promise(function (success,error) {
        let value=true;
        if(value)
        {
            success("哈哈成功了");
        }
        else
        {
            error("哎，失败了");
        }
    });
    promise.then(
        function (params) {
            print("第一次调用成功")
            print(params);
            return "haha1"
        }
    ).catch(function (params) {
        print("第一次失败");
        print(params);
        //setTimeout(()=>{throw params},0);
    }).done(function (params) {
        print("结束了，老弟")
    })
}