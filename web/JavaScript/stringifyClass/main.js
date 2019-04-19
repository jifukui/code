function stringifyClass (value) 
{
  if (Array.isArray(value)) 
  {
    return stringifyArray(value)
  }
  if (isObject(value)) 
  {
    return stringifyObject(value)
  }
  if (typeof value === 'string') 
  {
    return value
  }
  /* istanbul ignore next */
  return ''
}
/**数组拼接以空格区分 */
function stringifyArray (value) 
{
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) 
  {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') 
    {
      if (res) 
      { 
          console.log(typeof res)
        res += ' '; 
      }
      res += stringified;
    }
  }
  return res
}
/**对象字符串化 将对象的键拼接为以空格分隔的字符串*/
function stringifyObject (value) 
{
  var res = '';
  for (var key in value) 
  {
    if (value[key]) 
    {
      if (res) 
      { 
        res += ' '; 
      }
      res += key;
    }
  }
  return res
}
function isDef (v) 
{
    return v !== undefined && v !== null
}
function isObject (obj) 
{
    return obj !== null && typeof obj === 'object'
}
// var a="jifukui"
var a=["1","2","3","4",123,["567","jjj"]]
// var a={a:1,b:1,c:1}
// var a=[{a:1,b:2,c:3},{q:"123",w:"456"}]
// var a=[{a:1,b:2,c:3},["123","456","789"],"jifukui"]
var b=stringifyClass(a)
console.log(b)