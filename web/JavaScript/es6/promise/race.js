const print=console.log;
function objp(obj) {
    for(let data in obj)
    {
        if(Object.prototype.toString.call(obj[data])==='[object Object]')
        {
            print(`---------${data}-------------`)
            objp(obj[data]);
        }
        else
        {
            print(`${data} is ${obj[data]}`);
        }
    }
};
/***all的处理 */
{
    print("All 的处理")
    let p1=new Promise(function (a,b) {
        let i=true;
        if(i)
        {
            a("1 has ok");
            
        }
        else
        {
            b("1 has error");
            
        }
    }).then(function (params) {
        print(params);
        return "1 ok";
    }).catch(function (params) {
        print(params);
        return "1 error"
    });
    let p2=new Promise(function (a,b) {
        let i=true;
        if(i)
        {
            a("2 has ok");
            
        }
        else
        {
            b("2 has error");
            
        }
    }).then(function (params) {
        print(params);
        return "2 ok";
    }).catch(function (params) {
        print(params);
        return "2 error"
    });
    let p3=new Promise(function (a,b) {
        let i=true;
        if(i)
        {
            a("3 has ok");
            
        }
        else
        {
            b("3 has error");
            
        }
    }).then(function (params) {
        print(params);
        return "3 ok";
    }).catch(function (params) {
        print(params);
        return "3 error";
    });
    let data=Promise.race([p1,p2,p3]).then(function (params) {
        print(params);
        print('have all success' );
    }).catch(function (params) {
        print(params);
        print('have some error');
    })
}