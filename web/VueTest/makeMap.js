function makeMap (str,expectsLowerCase) 
{
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) 
    {
        map[list[i]] = true;
    }
    console.log("have be called");
    return expectsLowerCase
    ? function (val) { console.log("1 "+ val+" map is "+JSON.stringify(map) );return map[val.toLowerCase()]; }
    : function (val) { console.log("2 " +val+" map is "+JSON.stringify(map));return map[val]; }
    }
  

var isBuiltInTag;
isBuiltInTag = makeMap('slot,component', true);
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
console.log(isBuiltInTag('component'));
console.log(isReservedAttribute("key"));