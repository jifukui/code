const assert = require('assert').strict;
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
// let func = new assert.AssertionError({
//     message:"jifukui test",
//     actual:"jifukui actual",
//     expected:"jifukui expected",
//     operator:"jifukuiu op",
//     stackStartFn:ji
// })
assert([],"the value number 1 is not true")
assert.deepEqual(a,c);
assert.doesNotMatch('I will fail', /fail/);