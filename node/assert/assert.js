const assert = require('assert').strict;
// assert.strictEqual([1,2,3,4],[1,2,3,4],"fuck you ")
//相等时正确执行，不等时抛出后面的错误
// assert.strictEqual(1,2,"fuck you ");
// let test = new assert.AssertionError({
//     message:"jifukui test errorr message",
//     actual:"have actual",
//     expected:"have not expected",
//     operator:"have this operator",
//     stackStartFn:null
// });
// try{
//     assert.strictEqual(1,2,test);
// }catch(err){
//     console.log("the error message is ")
//     console.dir(err);
// }
// const { message } = new assert.AssertionError({
//     actual: 1,
//     expected: 2,
//     operator: 'strictEqual'
//   });
// assert.strictEqual(1,2)
//   try {
//     assert.strictEqual(1, 2);
//   } catch (err) {
//     console.log("the error message is ")
//     assert(err instanceof assert.AssertionError);
//     assert.strictEqual(err.message, message);
//     assert.strictEqual(err.name, 'AssertionError');
//     assert.strictEqual(err.actual, 1);
//     assert.strictEqual(err.expected, 2);
//     assert.strictEqual(err.code, 'ERR_ASSERTION');
//     assert.strictEqual(err.operator, 'strictEqual');
//     assert.strictEqual(err.generatedMessage, true);
//   }
// assert(0,"the value is false");
let a={
    a:1,
    b:2,
    c:3
}
let b={
    a:1,
    b:2,
    c:3
}
let c={
    a:1,
    b:2,
    d:3
}
let d=a;
// assert.deepStrictEqual(a,b);
// assert.deepStrictEqual(a,c);
try{
    assert.deepStrictEqual(c,a,"我们不相等的啊");
}catch(err){
    console.log("the error is")
    console.dir(err);
}