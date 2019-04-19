var numbers = [65, 44, 12, 4];
function genStaticKeys (modules) {
  /**reduce函数逐个对数组中的元素做同样的操作 */
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}
var a=new Object(null);
var a=genStaticKeys(a);

console.log(a)