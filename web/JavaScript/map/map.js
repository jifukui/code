function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }
  var isBuiltInTag = makeMap('slot,component', true)
  console.log("data is "+isBuiltInTag);
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
  console.log("data is "+isReservedAttribute);