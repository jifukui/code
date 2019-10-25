const print=console.log;
function objp(obj) {
    for(let data in obj)
    {
        print(`${data} is ${obj[data]}`);
    }
};
/**属性的简洁表示法 */
{
    print("属性的简洁表示法");
    let foo='bar';
    let baz={foo};
    objp(baz);
}
/**方法的简洁表示 */
{
    
}