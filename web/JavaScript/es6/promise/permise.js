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
            print(params);
        },
        function (params) {
            print(params);
        }
    )
}
/**失败的调用 */
{
    print("实验2创建简单的promise函数");
    let promise=new Promise(function (success,error) {
        let value=false;
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
            print(params);
        },
        function (params) {
            print(params);
        }
    )
}
/**catch的处理 */
{
    print("实验2创建简单的catch函数");
    let promise=new Promise(function (success,error) {
        let value=false;
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
            print(params);
        }
    ).catch(function (params) {
        print(params);
    });
}
