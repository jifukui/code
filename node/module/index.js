let test1 = require("./export.js");
let test2 = require("./module.js");
console.log(`the test 1 is `)
console.dir(test1);
test1.say();
console.log(`the test 2 is `)
console.dir(test2);
console.log(require.cache)