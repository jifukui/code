var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) 
{
  return hasOwnProperty.call(obj, key)
}
var a={
    name:"jifukui",
}
var b=hasOwn(a,"name");
var c=hasOwn(a,"nam");
console.log(b);
console.log(c);