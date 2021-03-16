const assert = require("assert");


//assert函数用于判断传入的参数是否为真值
//assert(false,"错误的参数")

//assert.deepStrictEqual函数用于判断两个值是否深度严格相等
/*
{
    let a={
        name:"test",
        age:1
    }
    let b={
        name:"test",
        age:{}
    };
    assert.deepStrictEqual(a,b,"不相等")
}
{
    let a={
        name:"test",
        age:1
    }
    let b={
        name:"test",
        age:{}
    };
    assert.deepStrictEqual(a,b,"不相等")
}
*/


//assert.doesNotMatch用于判断字符串是否不匹配 14版本应该支持
/*
{
    assert.doesNotMatch("jfiukui",/$j/,"不匹配")
}
*/

//assert.doesNotReject没有被拒绝执行
/*
{
    assert.doesNotReject(Promise.reject("曹尼玛"),"没有被拒绝").catch(err=>{
        console.log(err)
    })
}
{
    assert.doesNotReject(Promise.re("曹尼玛"),"没有被拒绝").catch(err=>{
        console.log(err)
    })
}
*/
//assert.doesNotThrow有错误抛出的时候执行
/*
{
    assert.doesNotThrow(()=>{
        console.log("nothing")
    },"错误的信息")
}
{
    assert.doesNotThrow(()=>{
        throw new Error("会哭的孩子有奶吃")
    },"错误的信息")
}
*/


//assert.fail
/*
{
    assert.fail("good game")
}
*/


//assert.ifError(value)
{
    assert.ifError(undefined)
}
/*
{
    assert.ifError(1)
}*/