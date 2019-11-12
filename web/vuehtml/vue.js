/*!
 * Vue.js v2.5.0
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */
/**\vue-master\src\shared\util */
// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
/**这个文件定义了很多接口程序
 * 这里的程序大多使用了%checks用于将函数作为谓词函数即函数的主体是一个表达式，不支持局部变量的声明
 */

/**这个函数用于判断传入对象类型是否是未定义或者是null */
function isUndef (v) 
{
  return v === undefined || v === null
}
/**判断传入的对象是否定义过 */
function isDef (v) 
{
  return v !== undefined && v !== null
}
/**判断出入的对象的值是否为真 */
function isTrue (v) 
{
  return v === true
}
/**判断传入对象的值是否为假 */
function isFalse (v) 
{
  return v === false
}

/**检测传入对象的类型是否为字符串、数值或者是布尔型数据 */
function isPrimitive (value) 
{
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**判断传入的数据的类型是否为对象型且不为null
 * mixed表示支持传入任何类型
 */
function isObject (obj) 
{
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
/**设置_toString为返回对象的字符串形式 */
var _toString = Object.prototype.toString;

/**返回对象的类型 */
function toRawType (value) 
{
  return _toString.call(value).slice(8, -1)
}

/**判断传入的数据的类型是否是对象 */
function isPlainObject (obj) 
{
  return _toString.call(obj) === '[object Object]'
}
/**判断传入对象的类型是否是正则表达式 */
function isRegExp (v) 
{
  return _toString.call(v) === '[object RegExp]'
}

/**判断传入的数据是否是有效的数组索引值 */
function isValidArrayIndex (val) 
{
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**将任意类型转换为字符串形式
 * 如果是null类型输出空字符串
 * 如果是对象类型转换为缩进为2个空格的字符串
 * 其他类型调用string类型输出其值
 */
function toString (val) 
{
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**将字符串转换为数字
 * 如果传入的字符串无法转换为数字返回此字符串，反之返回其数值
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**将传入的字符串转换为判断对象中是否存在此属性 */
function makeMap (
  str,
  expectsLowerCase
) 
{
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) 
  {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}


var isBuiltInTag = makeMap('slot,component', true);


var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**移除数组中指定位置的值 */
function remove (arr, item) 
{
  if (arr.length) 
  {
    var index = arr.indexOf(item);
    if (index > -1) 
    {
      return arr.splice(index, 1)
    }
  }
}

/**hasOwnProperty 对象原型链是否具有指定的函数 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**判断对象或者是数组是否具有指定的属性 */
function hasOwn (obj, key) 
{
  return hasOwnProperty.call(obj, key)
}

/**使用闭包
 * 在cache对象中添加属性
 */
function cached (fn) 
{
  var cache = Object.create(null);
  return (function cachedFn (str) 
  {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}


/**下面这部分用于设置对象对应属性的属性值
 * 将-后面的字符转换为大写即驼峰式
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * 这部分将传入的字符串
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * 将字符串中的单词除首字符后面的字符转换为小写形式
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * 
 * @param {*} fn 
 * @param {*} ctx 
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**将从数组转换为从start到末尾位置的数组 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) 
  {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * 将form中的属性拷贝到to中，属于浅拷贝
 * @param {*} to 目的
 * @param {*} _from 源
 */
function extend (to, _from) 
{
  for (var key in _from) 
  {
    to[key] = _from[key];
  }
  return to
}

/**
 * 将数组转换为对象
 * @param {*} arr 
 */
function toObject (arr) 
{
  var res = {};
  for (var i = 0; i < arr.length; i++) 
  {
    if (arr[i]) 
    {
      extend(res, arr[i]);
    }
  }
  return res
}


/**
 * 定义空函数
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 */
function noop (a, b, c) {}

/**
 * 定义函数只返回错
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 */
var no = function (a, b, c) { return false; };

/**
 * 定义函数返回与自己想等的值
 * @param {*} _ 
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
/**
 * 产生静态的
 * @param {*} modules 
 */
function genStaticKeys (modules) 
{
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}


/**
 * 判断连个参数是否相等
 * @param {*} a 参数1
 * @param {*} b 参数2
 */
function looseEqual (a, b) 
{
  /**如果a绝对等于b返回真 */
  if (a === b) 
  {
    return true;
  }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) 
  {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) 
      {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } 
      else if (!isArrayA && !isArrayB) 
      {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } 
      else 
      {
        /* istanbul ignore next */
        return false
      }
    } 
    catch (e) 
    {
      /* istanbul ignore next */
      return false
    }
  } 
  else if (!isObjectA && !isObjectB) 
  {
    return String(a) === String(b)
  } 
  else 
  {
    return false
  }
}
/**
 * 判断数组中是否有值等于val
 * @param {*} arr 数组
 * @param {*} val 数值
 */
function looseIndexOf (arr, val) 
{
  for (var i = 0; i < arr.length; i++) 
  {
    if (looseEqual(arr[i], val)) 
    {
      return i;
    }
  }
  return -1
}


/**
 * 设置这个函数只执行一次
 * @param {*} fn 函数
 */
function once (fn) 
{
  var called = false;
  return function () 
  {
    /**如果called的值为假的处理 */
    if (!called) 
    {
      called = true;
      fn.apply(this, arguments);
    }
  }
}
/**end \vue-master\src\shared\util */

var SSR_ATTR = 'data-server-rendered';
/**有价值的类型 */
var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];
/**生命周期钩子函数 */
var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */
/**\vue-master\src\core\config.js */
/**导入no,noop,indentity
 * no:无论传入什么参数总是返回否
 * noop:不做任何有效的处理
 * indentity:返回相同的参数
 */
var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});
/**end \vue-master\src\core\config.js */

/*  */
/**\vue-master\src\core\util\lan.js */
/**创建一个不允许改变的空的对象 */
var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 * 判断字符串是否是以$字符或者是_字符开始
 */
function isReserved (str) 
{
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 * 定义对象的属性
 * 值为传入的值，可写可枚举
 * obj:对象
 * key:属性
 * enumerable:可枚举属性
 */
function def (obj, key, val, enumerable) 
{
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
/**判断字符是否只有数组字母下划线 */
var bailRE = /[^\w.$]/;
function parsePath (path) 
{
  /**如果包含非法字符返回 */
  if (bailRE.test(path)) 
  {
    return
  }
  /**将字符串以点号分隔 */
  var segments = path.split('.');
  /**返回处理函数
   * 如果传入的对象为否直接退出
   * 反之返回重新定义的结构体
   */
  return function (obj) 
  {
    for (var i = 0; i < segments.length; i++) 
    {
      if (!obj)
      {
        return
      }
      obj = obj[segments[i]];
    }
    return obj
  }
}
/**end \vue-master\src\core\util\lang.js */

/*  */
/**\vue-master\src\core\config.js */
/**导入no,noop,indentity
 * no:无论传入什么参数总是返回否
 * noop:不做任何有效的处理
 * indentity:返回相同的参数
 */
var config$1 = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});
/**end \vue-master\src\core\config.js */

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);
/**如果开发环境不是生产模式的处理 */
{
  /**判断是否有定义console */
  var hasConsole = typeof console !== 'undefined';
  /** */
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };
  /**警告函数 */
  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';
    /**对于有警告处理函数的处理，使用警告处理函数 */
    if (config$1.warnHandler) 
    {
      config$1.warnHandler.call(null, msg, vm, trace);
    } 
    /**对于没有警告处理函数的处理使用控制台输出 */
    else if (hasConsole && (!config$1.silent)) 
    {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };
  /**提示函数的实现 */
  tip = function (msg, vm) {
    if (hasConsole && (!config$1.silent)) 
    {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };
  /**格式化组件名称函数 */
  formatComponentName = function (vm, includeFile) {
    /**对于是根组件的处理 */
    if (vm.$root === vm) 
    {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) 
    {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };
  /**重复函数的实现，将字符串重复多次 */
  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };
  /**产生组件追踪 */
  generateComponentTrace = function (vm) {
    /**对于组件是 */
    if (vm._isVue && vm.$parent) 
    {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) 
      {
        /**对于树的长度大于0的处理 */
        if (tree.length > 0) 
        {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) 
          {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } 
          else if (currentRecursiveSequence > 0) 
          {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        /**向树中添加对象并设置vm为当前vm的父对象 */
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } 
    else 
    {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */
/**vue-master\src\core\util\util.js 错误处理相关函数*/
function handleError (err, vm, info) 
{
  if (vm) 
  {
    var cur = vm;
    while ((cur = cur.$parent)) 
    {
      /**设置hooks为错误捕捉函数 */
      var hooks = cur.$options.errorCaptured;
      if (hooks) 
      {
        for (var i = 0; i < hooks.length; i++) 
        {
          try 
          {
            /**错误捕捉 */
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) 
            {
              return
            }
          } 
          catch (e) 
          {
            /**出现错误调用错误处理函数 */
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) 
{
  /**判断是否配置了错误处理 */
  if (config$1.errorHandler) 
  {
    try 
    {
      /**调用错误处理 */
      return config$1.errorHandler.call(null, err, vm, info)
    } 
    catch (e) 
    {
      /**输出错误信息 */
      logError(e, null, 'config.errorHandler');
    }
  }
  /**输出错误信息 */
  logError(err, vm, info);
}
/**输出错误信息 */
function logError (err, vm, info) 
{
  /**对于开发环境不是生产模式输出错误原因和错误 */
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  /**控制台输出错误信息 */
  if (inBrowser && typeof console !== 'undefined') 
  {
    console.error(err);
  } 
  else 
  {
    throw err
  }
}
/**end vue-master\src\core\util\util.js */

/*  */
/* globals MessageChannel */
/**vue-master\src\core\util\env.js主要是判断寄主环境 */
var hasProto = '__proto__' in {};

// Browser environment sniffing
/**isBrowser判断是否是浏览器根据是否存在window对象，返回的是一个布尔值 */
var inBrowser = typeof window !== 'undefined';
/**如果是浏览器获取用户代理 */
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
/**判断浏览器是否是IE的内核 */
var isIE = UA && /msie|trident/.test(UA);
/**判断浏览器是否是IE9 */
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
/**判断浏览器是否是edge浏览器 */
var isEdge = UA && UA.indexOf('edge/') > 0;
/**判断是否是安卓的浏览器 */
var isAndroid = UA && UA.indexOf('android') > 0;
/**判断是否是IOS的浏览器 */
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
/**判断是否是谷歌的浏览器 */
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
/**原生对象是否具有watch功能 */
var nativeWatch = ({}).watch;


/**对于inBrower的值不为否的处理
 * 给全局变量添加属性和监听器
 */
if (inBrowser) 
{
  try {
    var opts = {};
    /**设置在opts对象上定义属性passive的获取函数 */
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        
      }
    })); 
    // https://github.com/facebook/flow/issues/285
    /**为对象添加 */
    window.addEventListener('test-passive', null, opts);
  } 
  catch (e) 
  {
    console.log("Add event listener have error "+e);
  }
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
/**判断是否是服务器端渲染
 * 设置_isServer属性的值
 */
var isServerRendering = function () {
  /**对于服务器未定义的处理 */
  if (_isServer === undefined) 
  {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') 
    {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } 
    else 
    {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
/**设置devtool的值 */
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
/**判断是否是原生的 */
function isNative (Ctor) 
{
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
/**判断是否支持Symbol和Reflect*/
var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
/** 定义nextTick函数，异步执行的实现
 * 
*/
var nextTick = (function () 
{
  /**回调函数数组 */
  var callbacks = [];
  /**挂起状态 */
  var pending = false;
  /** */
  var timerFunc;
  /**定义下一个时刻处理函数 
   * 根据浏览器的情况进行下一时刻处理函数的处理
  */
  function nextTickHandler () 
  {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) 
    {
      copies[i]();
    }
  }
  /**对于setImmediate不是未定义的且是原生的处理
   * 设置事件处理函数
   */
  if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) 
  {
    timerFunc = function () {
      setImmediate(nextTickHandler);
    };
  } 
  /**如果对于MessageChannel不是未定义的处理，使用MessaeChannel */
  else if (typeof MessageChannel !== 'undefined' && (isNative(MessageChannel) ||MessageChannel.toString() === '[object MessageChannelConstructor]')) 
  {
    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = nextTickHandler;
    timerFunc = function () {
      port.postMessage(1);
    };
  } 
  /**对于没有以上两个函数的处理 */
  else
  {
    /* istanbul ignore next */
    /**对于有Promise的处理 */
    if (typeof Promise !== 'undefined' && isNative(Promise)) 
    {
      // use microtask in non-DOM environments, e.g. Weex
      var p = Promise.resolve();
      timerFunc = function () {
        p.then(nextTickHandler);
      };
    } 
    /**实在是啥也没有使用timeout处理 */
    else 
    {
      // fallback to setTimeout
      timerFunc = function () {
        setTimeout(nextTickHandler, 0);
      };
    }
  }
  /**返回任务回调函数入队函数，回调函数入队
   * cb:回调函数
   * ctx:参数
   */
  return function queueNextTick (cb, ctx) 
  {
    var _resolve;
    /**回调函数入队 */
    callbacks.push(function () {
      if (cb) 
      {
        try 
        {
          cb.call(ctx);
        } 
        catch (e) 
        {
          handleError(e, ctx, 'nextTick');
        }
      } 
      else if (_resolve) 
      {
        _resolve(ctx);
      }
    });
    if (!pending) 
    {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') 
    {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();
/**设置集合_Set
 * 如果支持Set使用原生的Set
 * 如果不支持Set实现Set方法
 */
var _Set;
if (typeof Set !== 'undefined' && isNative(Set)) 
{
  // use native Set when available.
  _Set = Set;
} 
else 
{
  // a non-standard Set polyfill that only works with primitive keys.
  /**设置Set类匹配ISet */
  _Set = (function () {
    function Set () 
    {
      this.set = Object.create(null);
    }
    /**has函数的实现 */
    Set.prototype.has = function has (key) 
    {
      return this.set[key] === true
    };
    /**add函数的实现 */
    Set.prototype.add = function add (key) 
    {
      this.set[key] = true;
    };
    /**clear函数的实现 */
    Set.prototype.clear = function clear () 
    {
      this.set = Object.create(null);
    };

    return Set;
  }());
}
/**定义接口类型ISet */

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) 
{
  /**获取propOptions对象的某个属性 */
  var prop = propOptions[key];
  /**判断propsData中的key是否为此对象的自有属性 */
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // 对于prop的type的值为布尔型数据的处理设置value的值为布尔值
  if (isType(Boolean, prop.type)) 
  {
    /**对于key不为自身属性且自身没有默认属性的处理
     * 设置value的值为假
     */
    if (absent && !hasOwn(prop, 'default')) 
    {
      value = false;
    } 
    /**对于prop的type属性不为字符串型且value的值为空或者value的值恒等于将key转换为除首字母外其他都为小写字母的形式的处理
     * 设置value的值为真
     */
    else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) 
    {
      value = true;
    }
  }
  // check default value
  /**对于value值未定义的处理 */
  if (value === undefined) 
  {
    /**获取value的值为默认属性 */
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
/**获取默认值 */
function getPropDefaultValue (vm, prop, key) 
{
  // no default, return undefined
  /**对于对象没有此属性的处理 */
  if (!hasOwn(prop, 'default')) 
  {
    return undefined
  }
  /**设置def的值为此对象的默认的属性 */
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  /**对于不是生产模式且def是对象的处理，进行警告 */
  if ("development" !== 'production' && isObject(def)) 
  {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  /** */
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) 
  {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  /**对于def的值为函数获调用此函数的返回值，反之返回此数据 */
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
/**访问数据 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) 
{
  /**对于prop的require的值为真且absent的值为真的处理，
   * 警告并返回 
   * */
  if (prop.required && absent) 
  {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  /**对于value的值为空且prop的require的属性为真的处理
   * 直接返回
   */
  if (value == null && !prop.required) 
  {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  /**对于prop的type属性为真的处理
   * 
   */
  if (type) 
  {
    if (!Array.isArray(type)) 
    {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) 
    {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  /**对于vaild的处理
   * 进行警告
   */
  if (!valid) 
  {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) 
  {
    if (!validator(value)) 
    {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}
/**定义简单的检测 */
var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;
/**检测传入的数据value是否是对应的数据类型
 * 返回值：
 * valid：数据类型是否匹配
 * expectedtype：type的数据类型，即期望的数据类型
*/
function assertType (value, type) 
{
  var valid;
  /**获取expectedType的属性 */
  var expectedType = getType(type);
  /**对于expectedType的类型匹配的处理对于对象返回value的原型是否是type
   * 反之对于对象的处理
   * 对于数组的处理
   * 对于其他值的处理
   */
  if (simpleCheckRE.test(expectedType)) 
  {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') 
    {
      valid = value instanceof type;
    }
  } 
  else if (expectedType === 'Object') 
  {
    valid = isPlainObject(value);
  } 
  else if (expectedType === 'Array') 
  {
    valid = Array.isArray(value);
  } 
  else 
  {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**获取对象的类型 */
function getType (fn) 
{
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}
/**判断出入的数据类型是否相等 */
function isType (type, fn) 
{
  if (!Array.isArray(fn)) 
  {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) 
  {
    if (getType(fn[i]) === getType(type)) 
    {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */
/**这个文件没有什么用只是引入了很多的接口 */

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
/**创建Dep类 */
var Dep = function Dep () 
{
  this.id = uid++;
  this.subs = [];
};
/**将sub压入对象数组中 */
Dep.prototype.addSub = function addSub (sub) 
{
  this.subs.push(sub);
};
/**移除对象中的数据 */
Dep.prototype.removeSub = function removeSub (sub) 
{
  remove(this.subs, sub);
};
/**定义depend函数
 * 设置Dep对象的压入数组中
 */
Dep.prototype.depend = function depend () 
{
  if (Dep.target) 
  {
    Dep.target.addDep(this);
  }
};
/**Dep的通知函数
 * 设置此对象的所有子进行更新
 */
Dep.prototype.notify = function notify () 
{
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) 
  {
    subs[i].update();
  }
};

Dep.target = null;
/**目标栈数组 */
var targetStack = [];
/**向目标栈中压入数据 */
function pushTarget (_target) 
{
  if (Dep.target) 
  {
    targetStack.push(Dep.target);
  }
  Dep.target = _target;
}
/**提取目标栈中的数据 */
function popTarget () 
{
  Dep.target = targetStack.pop();
}

/*  */
/**引入vNode类 
 * 下面的语法是typesctipt语法中设置传入参数的类型有问号表示可以是未定义的类型使用|表示也支持这种类型
 * tag：标签
 * data：数据
 * children：子组件
 * text：文本内容
 * elm:节点元素
 * ns:
 * context：正文内容
 * key：
 * componentOptions：
 * componentInstance：
 * parent
 * raw：
 * isStatic：是否是静态
 * isRootInsert：是否在根中插入
 * isComment：是否是
 * isCloned:是否是克隆
 * isOnce：是否
 * asyncFactory：
 * asyncMeta：
 * isAsyncPlaceholder：
 * ssrContext：
 * functionalContext：
 * functionalOptions：
 * functionalScopeId：
*/
var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.functionalOptions = undefined;
  this.functionalScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () 
{
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};
/**创建一个文本节点 */


// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
/**节点复制，创建一个新的节点对象将传入节点的ns,istatic,key,iscomment的值进行复制设置iscloned的值设置为真
 * vnode:
 * deep:是否深度拷贝
 */
function cloneVNode (vnode, deep) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep && vnode.children) 
  {
    cloned.children = cloneVNodes(vnode.children);
  }
  return cloned
}
/**将一个节点数组进行拷贝 */
function cloneVNodes (vnodes, deep) 
{
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) 
  {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
/**数组的实现 */
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) 
{
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () 
  {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) 
    {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) 
    {
      ob.observeArray(inserted);
    }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
/**设置observerState的值 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
/**定义Observer类
 * value:对象
 * dep:依赖
 * vmCount:
 */
var Observer = function Observer (value) 
{
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  /**定义对象的__ob__属性 */
  def(value, '__ob__', this);
  /**对于值为数组的处理 */
  if (Array.isArray(value)) 
  {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } 
  else 
  {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
/** */
Observer.prototype.walk = function walk (obj) 
{
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) 
  {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) 
{
  for (var i = 0, l = items.length; i < l; i++) 
  {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
/**设置target的__proto__属性为src */
function protoAugment (target, src, keys) 
{
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**拷贝参数
 * 将src中的keys属性拷贝到target对象中
 */
function copyAugment (target, src, keys) 
{
  for (var i = 0, l = keys.length; i < l; i++) 
  {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
/**
 * value：
 * asRootData：
 * 返回发布对象
 */
function observe (value, asRootData) 
{
  /**对于value的不是对象或者value是VNode的实例的处理
   * 直接返回
   */
  if (!isObject(value) || value instanceof VNode) 
  {
    return
  }
  /**设置Ob的值为Observer或者是空对象 */
  var ob;
  /**对于value自身具有__ob__属性且其是Observer的实例的处理
   * 设置ob的值为value.__ob__
   */
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) 
  {
    ob = value.__ob__;
  } 
  /**对于observerState的shouldConvert属性为真
   * 且不是服务器端渲染
   * 且value不是数组或者不是
   * 且
   * 且value的isVue属性不为真的处理
   * 根据value创建一个新的Observer对象
   */
  else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) 
  {
    ob = new Observer(value);
  }
  /**如果asRootData的值和ob的值为针对处理设置ob的vmCount的值自增1 */
  if (asRootData && ob) 
  {
    ob.vmCount++;
  }
  return ob
}

/**
 * 定义对象的反应属性
 * @param {*} obj 反应的对象
 * @param {*} key 属性
 * @param {*} val 值
 * @param {*} customSetter 用户定义的设置处理函数
 * @param {*} shallow 是否隐藏
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) 
{
  var dep = new Dep();
  /**获取对象的对应属性的属性描述符 */
  var property = Object.getOwnPropertyDescriptor(obj, key);
  /**如果属性的可配置属性为否则退出 */
  if (property && property.configurable === false) 
  {
    return
  }

  // cater for pre-defined getter/setters
  /**获取获取和设置函数 */
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  /**定义属性
   * obj:对象
   * key:属性
   * 定义对象的属性为可枚举和可配置以及设置函数和获取函数
   */
  Object.defineProperty(obj, key, 
  {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () 
    {
      /**获取属性值 */
      var value = getter ? getter.call(obj) : val;
      /**对于Dep的target的属性不为否的处理
       * 更新依赖数组
       */
      if (Dep.target) 
      {
        dep.depend();
        if (childOb) 
        {
          childOb.dep.depend();
          if (Array.isArray(value)) 
          {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) 
    {
      var value = getter ? getter.call(obj) : val;
      /* 对于参数没有发生变化的处理 */
      if (newVal === value || (newVal !== newVal && value !== value)) 
      {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) 
      {
        customSetter();
      }
      if (setter) 
      {
        setter.call(obj, newVal);
      } 
      else 
      {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * 为对象设置属性值
 * @param {*} target 数组型的数据对象
 * @param {*} key 属性
 * @param {*} val 值
 */
function set (target, key, val) 
{
  /**对于对象是数组且key为有效的索引值的处理
   * 删除指定位置的值并向指定位置添加新的值
  */
  if (Array.isArray(target) && isValidArrayIndex(key)) 
  {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  /**对于对象具有此属性的处理
   * 设置此对象此属性的值
   */
  if (hasOwn(target, key)) 
  {
    target[key] = val;
    return val
  }
  /**获取对象的__ob__的值存在在ob中 */
  var ob = (target).__ob__;
  /**对于对象的_isVue的属性为真或者ob存在且ob的vmCount的值不为0的处理
   * 进行警告和退出 */
  if (target._isVue || (ob && ob.vmCount)) 
  {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  /**ob的值为否，添加对象的此属性和属性值 */
  if (!ob) 
  {
    target[key] = val;
    return val
  }
  /**定义反应处理*/
  defineReactive(ob.value, key, val);
  /**定义提示 */
  ob.dep.notify();
  /**返回参数值 */
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
/**删除功能,删除数组此索引位置的值或者是对象的此自身属性
 * target:数组对象或者是对象
 * key:键值或者是索引号
 */
function del (target, key) 
{
  /**对于target是数组且key为有效的数组索引值
   * 更新此位置的数值，删除此位置的值
   */
  if (Array.isArray(target) && isValidArrayIndex(key)) 
  {
    target.splice(key, 1);
    return
  }
  /**设置ob的值为对象__ob__的值 */
  var ob = (target).__ob__;
  /**如果对象的_isVue的为真或者是ob.vmCount的值为真的处理
   * 返回
   */
  if (target._isVue || (ob && ob.vmCount)) 
  {
    //"development" !== 'production' && warn ('Avoid deleting properties on a Vue instance or its root $data - just set it to null.')
    return
  }
  /**对于对象具有此属性返回 */
  if (!hasOwn(target, key)) 
  {
    return
  }
  /**删除对象的此属性 */
  delete target[key];
  /**如果对象的值为否的处理
   * 返回
   */
  if (!ob) 
  {
    return
  }
  /**调用对象的通知函数 */
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
/**依赖数组，更新对象的相关依赖数组 */
function dependArray (value) 
{
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) 
  {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) 
    {
      dependArray(e);
    }
  }
}

/*  */

var strats = config$1.optionMergeStrategies;

/**
 * Options with restrictions
 */
/**对于环境不是生产模式的处理 */
{
  /** */
  strats.el = strats.propsData = function (parent, child, vm, key) 
  {
    /**如果vm对象的值为否进行警告
     * 返回默认的strat
     */
    if (!vm) 
    {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    /**子不存在返回父 */
    return defaultStrat(parent, child)
  };
}

/**
 * 进行数据的合并，将from中的属性添加至to对象
 * @param {*} to 数据目标
 * @param {*} from 数据源
 */
function mergeData (to, from) 
{
  /**对于数据源的值为空的处理，直接返回目的数据 */
  if (!from) 
  {
    return to
  }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  /**将源数据中的数据合并到目的数据 */
  for (var i = 0; i < keys.length; i++) 
  {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    /**如果目的对象没有这个属性的处理添加此属性 */
    if (!hasOwn(to, key)) 
    {
      set(to, key, fromVal);
    } 
    /**对于目的对象没有此属性且目的对象的值为对象且源对象的值为对象的处理，递归调用此函数进行深度的复制 */
    else if (isPlainObject(toVal) && isPlainObject(fromVal)) 
    {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * 聚合数据
 * @param {*} parentVal 
 * @param {*} childVal 
 * @param {*} vm Vue对象
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) 
{
  /**对于Vue对象不存在的处理方式 */
  if (!vm) 
  {
    // in a Vue.extend merge, both should be functions
    if (!childVal) 
    {
      return parentVal
    }
    if (!parentVal) 
    {
      return childVal
    }
    return function mergedDataFn () 
    {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } 
  /**对于两个对象有一个存在的处理 */
  else if (parentVal || childVal) 
  {
    return function mergedInstanceDataFn () 
    {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) 
      {
        return mergeData(instanceData, defaultData)
      } 
      else 
      {
        return defaultData
      }
    }
  }
}
/**strats对象的data属性
 * parentVal：父值
 * childVal：子值
 * vm：组件对象
 * 如果vm的值为否
 * 如果子存在且子的类型不为方法，返回父的值
 * 反之返回当前strats的值与父的值聚合到子的值
 * 反之返回聚合父的值和子的值到vm的值
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) 
{
  if (!vm) 
  {
    if (childVal && typeof childVal !== 'function') 
    {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn.call(this, parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
/**聚合钩子
 * parentVal:
 * childVal:
 * 如果子的值为否返回父的值
 * 如果子的值为真
 * 如果父的值为真返回父的值concat后的值
 * 如果父的值为假判断子是否是数组
 * 如果子的属性为数组返回子，返回子的数组化形式
 */
function mergeHook (
  parentVal,
  childVal
) 
{
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}
/**设置strats的钩子的方法 */
LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});


/**聚合资源
 * parentVal：父值
 * childVal：子值
 * vm：组件
 * key：键值
 * 如果子的值为真，将子的值浅拷贝到资源对象中
 * 如果子的值为假，不对资源对象进行处理
 * 返回资源对象
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) 
{
  /**创建资源对象 */
  var res = Object.create(parentVal || null);
  if (childVal) 
  {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } 
  else 
  {
    return res
  }
}
/**strats对象中添加对应的资源的方法 */
ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});


/**strats对象的watch属性
 * parentVal：
 * childVal：
 * vm：
 * key：
 * 如果父的值和子的值都是对象的watch属性设置其值为undefined
 * 如果子的值为否返回父对象或者是空对象
 * 如果子的值为真父的值为否返回子对象
 * 如果父子对象都存在
 * 将父对象浅拷贝值资源对象中
 * 遍历子对象的属性
 * 如果也存在于父值中且不是数组设置临时变量为此属性值的数组化结构
 * 反之不做任何处理
 * 设置父对象的浅拷贝的此属性值为
 * 当此属性在父对象中设置此属性为数组拼接此子属性
 * 当存在于父属性中此属性在子对象中为数组设置为此子属性反之设置为子对象此属性的数组形式
 * 返回此对象的父对象的浅拷贝的合并版本
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) 
{
  /**如果父的值和子的值都是对象的watch属性设置其值为undefined */
  if (parentVal === nativeWatch) 
  {
    parentVal = undefined;
  }
  if (childVal === nativeWatch) 
  {
    childVal = undefined;
  }
  /* istanbul ignore if */
  if (!childVal) 
  {
    return Object.create(parentVal || null)
  }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) 
  {
    return childVal
  }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) 
  {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) 
    {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};
/**设置strats对象的props属性，methods属性，inject属性和computed属性
 * parentVal：
 * childVal：
 * vm：
 * key：
 * 如果父对象的值为假返回子对象
 * 如果父对象的值不为假的处理
 * 创建一个空格对象，浅拷贝父对象
 * 如果子对象存在，再将此对象浅拷贝子对象，返回合并之后的对象
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) 
{
  if (childVal && "development" !== 'production') 
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) 
  {
    return childVal
  }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) 
  {
    extend(ret, childVal);
  }
  return ret
};
/**设置strats对象的provide属性为聚合数据和方法的函数 */
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
/**childVal的值为未定义返回parent的值反之返回child的值 */
var defaultStrat = function (parentVal, childVal) 
{
  return childVal === undefined
    ? parentVal
    : childVal
};

/**检测组件中属性的名称是否是合法的属性名称
 * 对于组件中使用构建的标签或者是预留的标签进行警告
 */
function checkComponents (options) 
{
  for (var key in options.components) 
  {
    var lower = key.toLowerCase();
    /**不能是slot或者是component或者是预留的标签这里应该是没有的 */
    if (isBuiltInTag(lower) || config$1.isReservedTag(lower)) 
    {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}


/**
 * options：
 * vm：组件对象
 * 如果对象的props属性的值为假直接返回
 * 如果props属性为数组类型的处理
 * 遍历所有的内容如果值为字符串将字符串转换为驼峰格式并设置资源的此属性的值为type为空
 * 如果props属性为对象的处理
 * 遍历所有的属性将属性名设置为驼峰格式然后设置此属性为如果是对象为对象反之设置type为此属性的值
 * 最后设置对象的props属性值
*/
/**
 * 对对象的属性名称经过规则处理
 * @param {*} options Vue对象的options属性
 * @param {*} vm 组件对象
 */
function normalizeProps (options, vm) 
{
  /**获取Vue对象的options属性的props属性的值 */
  var props = options.props;
  if (!props) 
  {
    return
  }
  var res = {};
  var i, val, name;
  /**对于props类型为数组的处理
   * 遍历所有属性，
   * 对于参数值为字符串将字符串转换为驼峰形式设置此属性的值的{ type: null }
   */
  if (Array.isArray(props)) 
  {
    i = props.length;
    while (i--) 
    {
      val = props[i];
      if (typeof val === 'string') 
      {
        name = camelize(val);
        res[name] = { type: null };
      } 
      else {
        warn('props must be strings when using array syntax.');
      }
    }
  } 
  /**对于props的值为对象的处理
   * 遍历所有属性
   * 获取属性值和将属性名设置为驼峰形式
   * 设置资源此属性名的值为如果是对象为对象值如果不是对象为{ type: val }
   */
  else if (isPlainObject(props)) 
  {
    for (var key in props) 
    {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } 
  /**这部分在生产模式中不会出现 */
  else if ("development" !== 'production' && props) 
  {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * 
 * @param {*} options Vue对象的options属性
 * @param {*} vm Vue对象
 */
function normalizeInject (options, vm) 
{
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) 
  {
    for (var i = 0; i < inject.length; i++) 
    {
      normalized[inject[i]] = { from: inject[i] };
    }
  } 
  else if (isPlainObject(inject)) 
  {
    for (var key in inject) 
    {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } 
  else if ("development" !== 'production' && inject) 
  {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}
/**
 * 
 * @param {*} options 
 */
function normalizeDirectives (options) 
{
  var dirs = options.directives;
  if (dirs) 
  {
    for (var key in dirs) 
    {
      var def = dirs[key];
      if (typeof def === 'function') 
      {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}
/**
 * 
 * @param {*} name 
 * @param {*} value 
 * @param {*} vm 
 */
function assertObjectType (name, value, vm) 
{
  if (!isPlainObject(value)) 
  {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
/**聚合两个对象的参数
 * parent：父对象
 * child：子对象
 * vm：
 */
function mergeOptions (
  parent,
  child,
  vm
) 
{
  /**检测新赋值的参数是否正确 */
  {
    checkComponents(child);
  }
  /**如果子对象的类型为函数的处理
   * 设置子对象为子对象的options属性
   */
  if (typeof child === 'function') 
  {
    child = child.options;
  }
  /**规范化pros属性 */
  normalizeProps(child, vm);
  /**规范化注射属性 */
  normalizeInject(child, vm);
  /**规范化指令属性 */
  normalizeDirectives(child);
  /**获取子对象的extend属性如果存在 */
  var extendsFrom = child.extends;
  if (extendsFrom) 
  {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) 
  {
    for (var i = 0, l = child.mixins.length; i < l; i++) 
    {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) 
  {
    mergeField(key);
  }
  for (key in child) 
  {
    if (!hasOwn(parent, key)) 
    {
      mergeField(key);
    }
  }
  /**聚合域 */
  function mergeField (key) 
  {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}
/**
 * 
 * @param {*} options 
 * @param {*} type 
 * @param {*} id 
 * @param {*} warnMissing 
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) 
{
  /* istanbul ignore if */
  if (typeof id !== 'string') 
  {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) 
  {
    return assets[id]
  }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) 
  {
    return assets[camelizedId]
  }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) 
  {
    return assets[PascalCaseId]
  }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) 
  {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */
/**这个文件没有什么用只是引入了很多的接口 */

/**这个应该主要是调试性能使用的吧 */
var mark;
var measure;
/**根据开发模式进行处理 */
/**对于设置的开发环境不是生产环境的处理 */
{
  /**设置perf的值为window的performance */
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) 
  {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}
/**end vue-master\src\core\util\env.js主要是判断寄主环境 */

/* not type checking this file because flow doesn't play well with Proxy */
/**导入内核的配置 */
var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );
  /**警告函数 */
  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };
  /**判断当前的运行环境是否支持Proxy */
  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);
  /**对于支持代理的处理 */
  if (hasProxy) 
  {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    /**进行代理的处理，不允许设置预留的一些参数，返回设置的状态 */
    config.keyCodes = new Proxy(config.keyCodes, 
    {
      set: function set (target, key, value) 
      {
        if (isBuiltInModifier(key)) 
        {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } 
        else 
        {
          target[key] = value;
          return true
        }
      }
    });
  }
  /**返回对象中是否有此属性 */
  var hasHandler = 
  {
    has: function has (target, key) 
    {
      var has = key in target;
      /**不属于预留的且首字符不为下划线 */
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) 
      {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };
  /**
   * 获取此属性的值
   */
  var getHandler = 
  {
    get: function get (target, key) 
    {
      if (typeof key === 'string' && !(key in target)) 
      {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };
  /**
   * 代理的初始化函数
   * 对于支持代理设置Vue函数进行设置时的代理函数传递给renderproxy
   * 对于不支持代理的返回设置为对象原型
   * vm为Vue函数
   */
  initProxy = function initProxy (vm) 
  {
    if (hasProxy) 
    {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } 
    else 
    {
      vm._renderProxy = vm;
    }
  };
}

/**这个应该主要是调试性能使用的吧 */
var mark$1;
var measure$1;
/**根据开发模式进行处理 */
/**对于设置的开发环境不是生产环境的处理 */
{
  /**设置perf的值为window的performance */
  var perf$1 = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf$1 &&
    perf$1.mark &&
    perf$1.measure &&
    perf$1.clearMarks &&
    perf$1.clearMeasures
  ) 
  {
    mark$1 = function (tag) { return perf$1.mark(tag); };
    measure$1 = function (name, startTag, endTag) {
      perf$1.measure(name, startTag, endTag);
      perf$1.clearMarks(startTag);
      perf$1.clearMarks(endTag);
      perf$1.clearMeasures(name);
    };
  }
}
/**end vue-master\src\core\util\env.js主要是判断寄主环境 */

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});
/**
 * 创建祈求函数
 * @param {*} fns 函数或者是函数数组 
 */
function createFnInvoker (fns) 
{
  /**
   * 祈求函数
   */
  function invoker () 
  {
    var arguments$1 = arguments;

    /**获取fns的值为祈求的处理函数 */
    var fns = invoker.fns;
    /**如果处理函数为数组的处理 */
    if (Array.isArray(fns)) 
    {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) 
      {
        cloned[i].apply(null, arguments$1);
      }
    } 
    /**反之调用函数的 */
    else 
    {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  /**设置处理函数 */
  invoker.fns = fns;
  /**返回对象 */
  return invoker
}
/**
 * 更新监听器
 * @param {*} on 
 * @param {*} oldOn 
 * @param {*} add 
 * @param {*} remove 
 * @param {*} vm 
 */
function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) 
{
  var name, cur, old, event;
  for (name in on) 
  {
    cur = on[name];
    old = oldOn[name];
    /**规范化事件名称 */
    event = normalizeEvent(name);
    /**如果当前属性未定义的处理，未处理 */
    if (isUndef(cur)) 
    {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } 
    /**如果在老的兑现中未定义的处理
     * 如果在行动对象中的fns属性未定义创建新的
     * 执行添加操作
     */
    else if (isUndef(old)) 
    {
      if (isUndef(cur.fns)) 
      {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } 
    /**如果新的对象不等于老的对象的处理设置老的处理函数为新的 */
    else if (cur !== old) 
    {
      old.fns = cur;
      on[name] = old;
    }
  }
  /**遍历存在于老的对象中的属性，
   * 如果此对象不存在规范化此事件名，然后移除此事件名
   */
  for (name in oldOn) 
  {
    if (isUndef(on[name])) 
    {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) 
{
  var invoker;
  var oldHook = def[hookKey];
  /**
   * 
   */
  function wrappedHook () 
  {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }
  /**对于老的钩子没有被定义的处理 */
  if (isUndef(oldHook)) 
  {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } 
  /**对于老的钩子被定义的处理 */
  else 
  {
    /**对于老的钩子的处理函数被定义且老的钩子被聚合的处理 */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) 
    {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } 
    /**对于上述不成立的处理，创建新的函数 */
    else 
    {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  /**设置Invoker的聚合状态 */
  invoker.merged = true;
  /**设置对象的钩子的新的值 */
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */
/**引入vNode类 
 * 下面的语法是typesctipt语法中设置传入参数的类型有问号表示可以是未定义的类型使用|表示也支持这种类型
 * tag：标签
 * data：数据
 * children：子组件
 * text：文本内容
 * elm:节点元素
 * ns:
 * context：正文内容
 * key：
 * componentOptions：
 * componentInstance：
 * parent
 * raw：
 * isStatic：是否是静态
 * isRootInsert：是否在根中插入
 * isComment：是否是
 * isCloned:是否是克隆
 * isOnce：是否
 * asyncFactory：
 * asyncMeta：
 * isAsyncPlaceholder：
 * ssrContext：
 * functionalContext：
 * functionalOptions：
 * functionalScopeId：
*/
var VNode$2 = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.functionalOptions = undefined;
  this.functionalScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors$1 = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors$1.child.get = function () 
{
  return this.componentInstance
};

Object.defineProperties( VNode$2.prototype, prototypeAccessors$1 );

var createEmptyVNode$1 = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode$2();
  node.text = text;
  node.isComment = true;
  return node
};
/**创建一个文本节点 */
function createTextVNode$1 (val) 
{
  return new VNode$2(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
/**节点复制，创建一个新的节点对象将传入节点的ns,istatic,key,iscomment的值进行复制设置iscloned的值设置为真
 * vnode:
 * deep:是否深度拷贝
 */
function cloneVNode$1 (vnode, deep) {
  var cloned = new VNode$2(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep && vnode.children) 
  {
    cloned.children = cloneVNodes$1(vnode.children);
  }
  return cloned
}
/**将一个节点数组进行拷贝 */
function cloneVNodes$1 (vnodes, deep) 
{
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) 
  {
    res[i] = cloneVNode$1(vnodes[i], deep);
  }
  return res
}

/*  */

function simpleNormalizeChildren (children) 
{
  for (var i = 0; i < children.length; i++) 
  {
    if (Array.isArray(children[i])) 
    {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
/**
 * 规范化子的处理
 * @param {*} children 
 */
function normalizeChildren (children) 
{
  return isPrimitive(children)
    ? [createTextVNode$1(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}
/**
 * 判断节点是否是文本节点
 * @param {*} node 
 */
function isTextNode (node) 
{
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c) && c.length > 0) {
      c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
      // merge adjacent text nodes
      if (isTextNode(c[0]) && isTextNode(last)) {
        res[lastIndex] = createTextVNode$1(last.text + (c[0]).text);
        c.shift();
      }
      res.push.apply(res, c);
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode$1(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode$1(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode$1(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode$1();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) 
{
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  /**获取 */
  var listeners = vm.$options._parentListeners;
  /**如果组件的存在父组件的监听器属性的处理
   * 更新当前组件的监听器
   */
  if (listeners) 
  {
    updateComponentListeners(vm, listeners);
  }
}

var target;
/**添加事件处理
 * 调用组件对象的on或者是once方法
 */
function add (event, fn, once) 
{
  if (once) 
  {
    target.$once(event, fn);
  } 
  else 
  {
    target.$on(event, fn);
  }
}
/**移除事件处理
 * 调用组件的off方法
 */
function remove$1 (event, fn) 
{
  target.$off(event, fn);
}
/**
 * 更新组件的监听器
 * @param {*} vm 组件
 * @param {*} listeners 监听器 
 * @param {*} oldListeners 老的监听器
 */
function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) 
{
  target = vm;
  /**调用监听器的更新方法 */
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}
/**事件混合，将事件添加至事件数组中
 * event：事件名称
 * fn:事件处理函数
 * 对于事件为数组，按序进行处理
 * 对于事件为字符串，将此对象添加至事件数组中如果是以hook:开始的设置对象具有hook处理事件的状态值为真
 */
function eventsMixin (Vue) 
{
  var hookRE = /^hook:/;
  /**组件对象的on方法的实现
   * event事件名称或者是字符串数组
   * fn：方法
   */
  Vue.prototype.$on = function (event, fn) 
  {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) 
    {
      for (var i = 0, l = event.length; i < l; i++) 
      {
        this$1.$on(event[i], fn);
      }
    } 
    else 
    {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) 
      {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };
  /**once，设置事件只执行一次
   * event:事件
   * fn:函数
   * 
   */
  Vue.prototype.$once = function (event, fn) 
  {
    var vm = this;
    /**定义删除此对象，然后调用此函数 */
    function on () 
    {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };
  /**删除事件处理函数中的处理项
   * event：
   * fn:
   * 如果传入的参数不为0，设置对象的事件对象为空对象返回此对象
   * 如果事件为数组分别调用off函数返回vm
   * 从事件属性对象中获取对应的属性
   * 如果为空返回
   * 如果参数的长度为1设置事件处理函数为空返回对象
   * 如果处理函数存在
   */
  Vue.prototype.$off = function (event, fn) 
  {
    var this$1 = this;

    var vm = this;
    //如果参数不为0的处理
    if (!arguments.length) 
    {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) 
    {
      for (var i = 0, l = event.length; i < l; i++) 
      {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) 
    {
      return vm
    }
    if (arguments.length === 1) 
    {
      vm._events[event] = null;
      return vm
    }
    if (fn) 
    {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) 
      {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) 
        {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };
  /**子组件向父组件传输消息，调用对应的处理函数
   * event：
   * 设置vm为当前的对象
   * 设置cbs:为当前
   */
  Vue.prototype.$emit = function (event) 
  {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) 
      {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    /**获取事件的处理函数，对于处理函数存在的处理
     * 对于此组件的所有的方法
     */
    var cbs = vm._events[event];
    if (cbs) 
    {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) 
      {
        try 
        {
          cbs[i].apply(vm, args);
        } 
        catch (e) 
        {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * 
 * @param {*} children 要渲染的子对象
 * @param {*} context  要渲染的内容
 */
function resolveSlots (
  children,
  context
) 
{
  var slots = {};
  /**对于子对象的值为假的处理，返回空的对象 */
  if (!children) 
  {
    return slots
  }
  /**定义默认的槽
   * 变量子对象的所有参数
   */
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) 
  {
    var child = children[i];
    var data = child.data;
    // 删除属性上有槽数据的槽数据
    if (data && data.attrs && data.attrs.slot) 
    {
      delete data.attrs.slot;
    }
    /**对于 */
    if ((child.context === context || child.functionalContext === context) &&data && data.slot != null) 
    {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') 
      {
        slot.push.apply(slot, child.children);
      } 
      else 
      {
        slot.push(child);
      }
    } 
    else 
    {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) 
  {
    slots.default = defaultSlot;
  }
  return slots
}
/**
 * 判断是否是空白
 * @param {*} node 
 */
function isWhitespace (node) {
  return node.isComment || node.text === ' '
}
/**
 * 
 * @param {*} fns 
 * @param {*} res 
 */
function resolveScopedSlots (
  fns, // see flow/vnode
  res
) 
{
  res = res || {};
  for (var i = 0; i < fns.length; i++) 
  {
    if (Array.isArray(fns[i])) 
    {
      resolveScopedSlots(fns[i], res);
    } 
    else 
    {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;
/**
 * 初始化生命周期
 * 设置组件对象的相关参数和初始化相关的参数
 * @param {*} vm 
 */
function initLifecycle (vm) 
{
  /**
   * 获取Vue对象的options对象
   */
  var options = vm.$options;

  // locate first non-abstract parent
  /**获取组件的父组件 */
  var parent = options.parent;
  /**对于父组件存在且abstract属性为假的处理
   * 如果父组件的.$options.abstract的值为真且parent.$parent的值为真的处理
   * 更新parent的是使上述条件不成立
   * 在主组件的子组件队列中添加此组件
   */
  if (parent && !options.abstract) 
  {
    while (parent.$options.abstract && parent.$parent) 
    {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  /**设置此组件的一些默认值 */
  /**此组件的父组件 */
  vm.$parent = parent;
  /**此组件是否是根组件 */
  vm.$root = parent ? parent.$root : vm;
  /**此组件的子组件 */
  vm.$children = [];
  /** */
  vm.$refs = {};
  /**此组件的监听器 */
  vm._watcher = null;
  /**此组件的活跃状态 */
  vm._inactive = null;
  /**此组件的暂停状态 */
  vm._directInactive = false;
  /**此组件的挂载状态 */
  vm._isMounted = false;
  /**此组件的销毁状态 */
  vm._isDestroyed = false;
  /**此组件的预销毁状态 */
  vm._isBeingDestroyed = false;
}
/**组件的生命周期混合，实现组件的更新，强制更新和销毁的实现 */
function lifecycleMixin (Vue) 
{
  /**添加组件的更新哈数
   * vnode：
   * hydrating
   */
  Vue.prototype._update = function (vnode, hydrating) 
  {
    var vm = this;
    /**这个组件被挂载调用回调函数，进行预处理 */
    if (vm._isMounted) 
    {
      callHook(vm, 'beforeUpdate');
    }
    /**上一级元素 */
    var prevEl = vm.$el;
    /**上一级节点 */
    var prevVnode = vm._vnode;
    /**上一级有效实例 */
    var prevActiveInstance = activeInstance;
    /**设置有效实例为当前实例 */
    activeInstance = vm;
    /**设置当前节点的父节点为传入的vnode */
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    /**如果上一级节点不存在的处理，设置此节点的el值为调用__patch__函数的处理 */
    if (!prevVnode) 
    {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } 
    else 
    {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    /**上一级元素存在的处理，设置上一级的__vue__的值为null */
    if (prevEl) 
    {
      prevEl.__vue__ = null;
    }
    /**本组件的$el的值为真的处理设置vm.$el.__vue__的值为vm */
    if (vm.$el) 
    {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    /**如果 */
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) 
    {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };
  /**更新所有当前的组件的_watcher */
  Vue.prototype.$forceUpdate = function () 
  {
    var vm = this;
    if (vm._watcher) 
    {
      vm._watcher.update();
    }
  };
/**销毁组件  */
  Vue.prototype.$destroy = function () 
  {
    var vm = this;
    /**如果组件的开始销毁状态为真返回 */
    if (vm._isBeingDestroyed) 
    {
      return
    }
    /**调用开始销毁的钩子函数 */
    callHook(vm, 'beforeDestroy');
    /**设置开始销毁的值为真 */
    vm._isBeingDestroyed = true;
    // remove self from parent
    /**获取当前组件的父组件并在父组件的子组件中删除此组件 */
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) 
    {
      remove(parent.$children, vm);
    }
    // teardown watchers
    /**关闭此组件的监听器 */
    if (vm._watcher) 
    {
      vm._watcher.teardown();
    }
    /**删除此组件的所有组件的监听器 */
    var i = vm._watchers.length;
    while (i--) 
    {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    /**如果此组件的 */
    if (vm._data.__ob__) 
    {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    /**设置此组件的销毁状态为真 */
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) 
    {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) 
    {
      vm.$vnode.parent = null;
    }
  };
}
/**挂载组件,Vue对象$mount的具体实现
 * vm:组件对象
 * el:挂载的元素
 * hydrating：这个值一般很少用
 */


function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) 
{
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) 
  { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) 
  {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) 
    {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) 
  {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) 
  {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}
/**在组件树中向上获取组件的状态，即获取组件的状态 */
function isInInactiveTree (vm) 
{
  /**组件存在，如果组件的有效态为真返回真，反之返回假 */
  while (vm && (vm = vm.$parent)) 
  {
    if (vm._inactive) 
    {
      return true
    }
  }
  return false
}
/**设置子组件的状态 */
function activateChildComponent (vm, direct) 
{
  if (direct) 
  {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) 
    {
      return
    }
  } 
  else if (vm._directInactive) 
  {
    return
  }
  if (vm._inactive || vm._inactive === null) 
  {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) 
    {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}
/**暂停组件
 * vm：组件对象
 * direct:暂停标志
 */
function deactivateChildComponent (vm, direct) 
{
  /**暂停的处理
   * 设置暂停状态为真
   * 如果组件的状态为真返回
   */
  if (direct) 
  {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) 
    {
      return
    }
  }
  /**如果组件的活跃状态为假的处理且要解除暂停的处理
   * 设置主键的活跃状态为真，
   * 变量此组件的子组件设置为停止暂停
   * 调用钩子函数
   */
  if (!vm._inactive) 
  {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) 
    {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}
/**调用钩子函数
 * vm：组件
 * hook：状态字符串
 */
function callHook (vm, hook) {
  /**获取组件对应的钩子函数 */
  var handlers = vm.$options[hook];
  /**对于钩子函数存在的处理 */
  if (handlers) 
  {
    for (var i = 0, j = handlers.length; i < j; i++) 
    {
      try 
      {
        handlers[i].call(vm);
      } 
      catch (e) 
      {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  /**对于组件定义_hasHookEvent的处理 */
  if (vm._hasHookEvent) 
  {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;
/**监听队列 */
var queue = [];
/**有效的孩子，组件数组 */
var activatedChildren = [];
/**has 监听器对象*/
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
/**复位调度器的状态
 * 设置队列长度和有效的子的长度都为0
 * 对于环境不是生产环境的设置circular对象为空对象
 * 设置等待和刷新为否
 */
function resetSchedulerState () 
{
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
/**刷新任务队列
 * 
 */
function flushSchedulerQueue () 
{
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  /**对队列进行排序 */
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) 
  {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) 
    {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) 
      {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config$1.devtools) 
  {
    devtools.emit('flush');
  }
}
/**调用更新钩子
 * 如果组件的监视器对象与监视器队列中的监视器相等且组件的挂载状态为挂载
 * 调用主键的更新钩子函数
 */
function callUpdatedHooks (queue) 
{
  var i = queue.length;
  while (i--) 
  {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) 
    {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
/**有效状态的组件的队列
 * vm:
 * 设置组件的_inactive的值为假
 * 将当前的主键添加至有效的孩子队列中
 */

/**设置监视器队列中所有的监视器的_iacctive的值为真，调用activateChildComponent函数 */
function callActivatedHooks (queue) 
{
  for (var i = 0; i < queue.length; i++) 
  {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
/**监听队列
 * 获取监听器的id
 * 对于不存在此监听器的处理
 */
function queueWatcher (watcher) 
{
  var id = watcher.id;
  /**对于监听器数组中此项参数值为null的处理
   * 设置此属性的值为真
   * 对于刷新为假的监听器队列中添加此监听器。
   * 对于刷新为真的处理，将监听对象添加到监听数组中
   * 对于waiting的值为假设置其值为真且下一个是个运行刷新调度队列
   */
  if (has[id] == null) 
  {
    has[id] = true;
    if (!flushing) 
    {
      queue.push(watcher);
    } 
    else 
    {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) 
      {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) 
    {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
/**导出默认的监视器
 * vm：组件对象
 * expression：
 * cb:回调函数
 * id:监听器的ID
 * deep:深度模式
 * user:用户模式
 * lazy:懒散模式
 * sync:同步状态
 * dirty:参数是否修改
 * active:监听器活动的状态
 * deps:当前依赖数组
 * newDeps:新的依赖数组
 * depIds:依赖的id
 * newDepIds:新的依赖的id 
 * getter:获取器
 * value:监听器的参数
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) 
{
  this.vm = vm;
  vm._watchers.push(this);
  // 设置状态
  if (options) 
  {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } 
  else 
  {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') 
  {
    this.getter = expOrFn;
  } 
  else 
  {
    this.getter = parsePath(expOrFn);
    if (!this.getter) 
    {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};
/**访问器实现 */
Watcher.prototype.get = function get () 
{
  /**在事件处理队列中添加此监听对象 */
  pushTarget(this);
  var value;
  var vm = this.vm;
  try 
  {
    /**使用构造函数传入的参数进行处理 */
    value = this.getter.call(vm, vm);
  } 
  catch (e) 
  {
    if (this.user) 
    {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } 
    else 
    {
      throw e
    }
  } 
  finally 
  {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    /**如果对象的deep属性的值为真 */
    if (this.deep) 
    {
      traverse(value);
    }
    /**弹出此 */
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**添加依赖 */
Watcher.prototype.addDep = function addDep (dep) 
{
  var id = dep.id;
  /**如果在newDepIds中没有此属性的处理
   * 添加此属性将此属性压入依赖数组中
   * 如果depIds中也没有此属性，将此属性添加至Sub属性中
   */
  if (!this.newDepIds.has(id)) 
  {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) 
    {
      dep.addSub(this);
    }
  }
};

/**清除依赖，清除Sub属性中的依赖 */
Watcher.prototype.cleanupDeps = function cleanupDeps () 
{
    var this$1 = this;

  var i = this.deps.length;
  while (i--) 
  {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) 
    {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**更新依赖 */
Watcher.prototype.update = function update () 
{
  /* istanbul ignore else */
  if (this.lazy) 
  {
    this.dirty = true;
  } 
  else if (this.sync) 
  {
    this.run();
  } 
  else 
  {
    queueWatcher(this);
  }
};

/**运行监听器 */
Watcher.prototype.run = function run () 
{
  /**对于监听器处于运行模式的处理
   * 调用获取参数
   * 如果参数不等于当前的值
   * 或者value是对象
   * 或者deep模式的处理
   * 设置老值为当前值，设置当前值为获取到的值，调用回调函数进行处理
   */
  if (this.active) 
  {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) 
    {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) 
      {
        try 
        {
          this.cb.call(this.vm, value, oldValue);
        } 
        catch (e) 
        {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } 
      else 
      {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
/**更新当前监听器的值，设置是否修改为否 */
Watcher.prototype.evaluate = function evaluate () 
{
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
/**全部的依赖 */
Watcher.prototype.depend = function depend () 
{
    var this$1 = this;

  var i = this.deps.length;
  while (i--) 
  {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
/**关闭监听器，删除所有的依赖 */
Watcher.prototype.teardown = function teardown () 
{
    var this$1 = this;

  if (this.active) 
  {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) 
    {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) 
    {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

var seenObjects = new _Set();
function traverse (val) 
{
  /**清空集合对象 */
  seenObjects.clear();
  _traverse(val, seenObjects);
}
/**这个函数在deep为真的时候调用
 * 这个函数的作用是判定val的值不是对象和数组且不可扩展时直接返回
 * 对于对象具有__ob__s属相如果有此属性返回没有进行添加
 * 对于是数组和对象递归进行处理，即用来设置seen对象
 * val：
 * seen：
 */
function _traverse (val, seen) 
{
  var i, keys;
  /**是否是数组 */
  var isA = Array.isArray(val);
  /**对于val不是数组也不是对象或者是此对象不可以进行扩展的处理
   * 返回空
   */
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) 
  {
    return
  }
  /**对于对象具有__ob__属性 */
  if (val.__ob__) 
  {
    var depId = val.__ob__.dep.id;
    /**对于对象具有depid属性值的属性
     * 返回空
     */
    if (seen.has(depId)) 
    {
      return
    }
    /**反之对此对象添加此属相 */
    seen.add(depId);
  }
  /**对于是数组的处理 */
  if (isA) 
  {
    i = val.length;
    while (i--) 
    {
      _traverse(val[i], seen);
    }
  } 
  /**对于不是数组的处理 */
  else 
  {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) 
    {
      _traverse(val[keys[i]], seen);
    }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
/**创建代理函数
 * target：目的对象
 * sourcekey:
 * key:
 * 设置对象target对象key属性的值和获取与设置函数
 */
function proxy (target, sourceKey, key) 
{
  sharedPropertyDefinition.get = function proxyGetter () 
  {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) 
  {
    this[sourceKey][key] = val;
  };
  /**定义属性 */
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
/**初始化对象的状态
 * vm：组件对象
 * 如果组件对象具有props属性初始化props
 * 如果组件对象有methods对象初始化methods
 * 如果组件对象有data属性初始化data,反之调用observe函数
 * 如果组件对象具有computed属性初始化计算
 * 如果组件对象具有watch属性初始化watch
 */
function initState (vm) 
{
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) 
  {
    initProps(vm, opts.props);
  }
  if (opts.methods) 
  {
    initMethods(vm, opts.methods);
  }
  if (opts.data) 
  {
    initData(vm);
  } 
  else 
  {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) 
  {
    initComputed(vm, opts.computed);
  }
  if (opts.watch && opts.watch !== nativeWatch) 
  {
    initWatch(vm, opts.watch);
  }
}
/**初始化props
 * vm：组件对象
 * propsOptions：
 * 获取组件中的propsData的数据，设置props变量
 */
function initProps (vm, propsOptions) 
{
  /**propsData变量存储当前组件中$options.propsData属性的值如果不存在为空对象 */
  var propsData = vm.$options.propsData || {};
  /**props变量用于存储props属性 */
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  /**keys变量存储传入对象的属性值 */
  var keys = vm.$options._propKeys = [];
  /**isRoot变量存储是否是根组件 */
  var isRoot = !vm.$parent;
  // root instance props should be converted
  /**设置发布器的状态 */
  observerState.shouldConvert = isRoot;
  /**将传入对象中的属性值添加至keys数组中
   * 判断value值是否是合法的props
   * 为此props对象添加发布处理
   * 如果这个属性不在组件对象中为组件添加此属性
   * 设置发布器的状态值为真
   */
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||config$1.isReservedAttr(hyphenatedKey)) 
      {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) 
    {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) 
  loop( key );
  observerState.shouldConvert = true;
}
/**初始化数据
 * vm：组件对象
 */
function initData (vm) 
{
  /**data变量存储组件对象的数据 */
  var data = vm.$options.data;
  /**设置data值 */
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  /**如果data的类型不是对象的处理设置data为空对象 */
  if (!isPlainObject(data)) 
  {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  /**
   * 设置keys的值为对象的键值
   * 设置props的值
   * 设置methods的值
   */
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  /**循环获取data数据中的值需要保证data中的数据和props中的数据不冲突 */
  while (i--) 
  {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) 
      {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    /**对于props存在且此属性存在于props的处理 */
    if (props && hasOwn(props, key)) 
    {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } 
    /**对于key不是预留的参数的处理
     * 定义组件的_data属性中的key属性的设置访问函数
     */
    else if (!isReserved(key)) 
    {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}
/**获取数据
 * data:为函数
 * vm:为组件
 * 如果正常返回调用函数的返回值
 * 反之返回空对象
 */
function getData (data, vm) 
{
  try 
  {
    return data.call(vm, vm)
  } 
  catch (e) 
  {
    handleError(e, vm, "data()");
    return {}
  }
}
/**设置组件的监测器操作 */
var computedWatcherOptions = { lazy: true };
/**初始化计算器
 * vm:为组件
 * computer：计算对象
 * 
 */
function initComputed (vm, computed) 
{
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  /**此值获取是否是服务器端渲染 */
  var isSSR = isServerRendering();

  for (var key in computed) 
  {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) 
    {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) 
    {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) 
    {
      defineComputed(vm, key, userDef);
    } 
    else {
      if (key in vm.$data) 
      {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } 
      else if (vm.$options.props && key in vm.$options.props) 
      {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}
/**定义计算
 * target：目标
 * key:属性
 * userDef:用户定义
 */
function defineComputed (
  target,
  key,
  userDef
) 
{
  /**获取是否是服务器端进行渲染 */
  var shouldCache = !isServerRendering();
  /**如果用户定义是函数的处理
   * 如果不是服务器端渲染设置访问函数 createComputedGetter函数
   * 如果是服务器端渲染为设置访问函数为用户定义的函数
   * 设置设置属性为空
   * 如果用户定义不是函数
   * 如果用户定义的get属性是否存在
   */
  if (typeof userDef === 'function') 
  {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } 
  else 
  {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&sharedPropertyDefinition.set === noop) 
  {
    sharedPropertyDefinition.set = function () 
    {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
/**创建计算的获取器的获取方法
 * key:
 * 返回对应属性的访问方法
 * 设置watch的值为对象的计算监视器
 * 如果存在如果监视器的状态为脏调用监视器的计算函数
 * 如果依赖的target属性存在调用监视器的depend函数
 * 返回监视器的值
 */
function createComputedGetter (key) 
{
  return function computedGetter () 
  {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) 
    {
      if (watcher.dirty) 
      {
        watcher.evaluate();
      }
      if (Dep.target) 
      {
        watcher.depend();
      }
      return watcher.value
    }
  }
}
/**初始化方法
 * vm：组件对象
 * methods：对象
 * 获取所有method对象中的数据
 */
function initMethods (vm, methods) 
{
  var props = vm.$options.props;
  for (var key in methods) 
  {
    {
      if (methods[key] == null) 
      {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) 
      {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) 
      {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}
/**初始化监视器
 * vm：组件
 * watch：对象
 * 将watch对象中的属性创建监视器对象
 * 如果属性是数组对数组中的每一个值都创建监视器
 * 其他对象为对象创建监视器
 */
function initWatch (vm, watch) 
{
  for (var key in watch) 
  {
    var handler = watch[key];
    if (Array.isArray(handler)) 
    {
      for (var i = 0; i < handler.length; i++) 
      {
        createWatcher(vm, key, handler[i]);
      }
    } 
    else 
    {
      createWatcher(vm, key, handler);
    }
  }
}
/**创建监视器
 * vm：组件对象
 * keyOrFn：
 * Handler：
 * option:
 * 返回组件的
 * 根据Handler是否为可扩展对象进行处理
 * 如果handler为可扩展对象设置option的值为Handler设置Handler的值为Handler的值的Handler属性
 * 如果Handler的类型为字符串类型的处理设置Handler的值为组件对象的Handler属性
 * 返回组件对象调用watch的结果
 */
function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) 
{
  /**对于是对象的处理 */
  if (isPlainObject(handler)) 
  {
    options = handler;
    handler = handler.handler;
  }
  /**对于是字符串的处理 */
  if (typeof handler === 'string') 
  {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}
/**
 * 在Vue的原型对象上添加$data和$props属性的获取方法
 * 设置原型的set和del方法
 * watch方法
 * @param {*} Vue Vue对象 
 */
function stateMixin (Vue) 
{
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () 
  { 
    return this._data 
  };
  var propsDef = {};
  propsDef.get = function () 
  { 
    return this._props 
  };
  {
    dataDef.set = function (newData) 
    {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () 
    {
      warn("$props is readonly.", this);
    };
  }
  /**定义对象的data和props */
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  /**设置对象的设置和删除方法 */
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;
  /**实现监听
   * 如果cb对象是可扩展对象使用createWatcher创建监听器
   * 反之创建监听器对象根据传入对象的是否立即执行进行处理返回关闭监听函数
   */
  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) 
  {
    var vm = this;
    if (isPlainObject(cb)) 
    {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) 
    {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () 
    {
      watcher.teardown();
    }
  };
}

/*  */
/* globals MessageChannel */
/**vue-master\src\core\util\env.js主要是判断寄主环境 */


// Browser environment sniffing
/**isBrowser判断是否是浏览器根据是否存在window对象，返回的是一个布尔值 */
var inBrowser$1 = typeof window !== 'undefined';
/**如果是浏览器获取用户代理 */
var UA$1 = inBrowser$1 && window.navigator.userAgent.toLowerCase();
/**判断浏览器是否是IE的内核 */
var isIE$1 = UA$1 && /msie|trident/.test(UA$1);
/**判断浏览器是否是IE9 */
var isIE9$1 = UA$1 && UA$1.indexOf('msie 9.0') > 0;
/**判断浏览器是否是edge浏览器 */
var isEdge$1 = UA$1 && UA$1.indexOf('edge/') > 0;
/**判断是否是安卓的浏览器 */
var isAndroid$1 = UA$1 && UA$1.indexOf('android') > 0;
/**判断是否是IOS的浏览器 */
var isIOS$1 = UA$1 && /iphone|ipad|ipod|ios/.test(UA$1);
/**判断是否是谷歌的浏览器 */
var isChrome$1 = UA$1 && /chrome\/\d+/.test(UA$1) && !isEdge$1;

// Firefox has a "watch" function on Object.prototype...
/**原生对象是否具有watch功能 */


var supportsPassive$1 = false;
/**对于inBrower的值不为否的处理
 * 给全局变量添加属性和监听器
 */
if (inBrowser$1) 
{
  try {
    var opts$1 = {};
    /**设置在opts对象上定义属性passive的获取函数 */
    Object.defineProperty(opts$1, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive$1 = true;
      }
    })); 
    // https://github.com/facebook/flow/issues/285
    /**为对象添加 */
    window.addEventListener('test-passive', null, opts$1);
  } 
  catch (e) 
  {
    console.log("Add event listener have error "+e);
  }
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer$1;
/**判断是否是服务器端渲染
 * 设置_isServer属性的值
 */
var isServerRendering$1 = function () {
  /**对于服务器未定义的处理 */
  if (_isServer$1 === undefined) 
  {
    /* istanbul ignore if */
    if (!inBrowser$1 && typeof global !== 'undefined') 
    {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer$1 = global['process'].env.VUE_ENV === 'server';
    } 
    else 
    {
      _isServer$1 = false;
    }
  }
  return _isServer$1
};

// detect devtools
/**设置devtool的值 */


/* istanbul ignore next */
/**判断是否是原生的 */
function isNative$1 (Ctor) 
{
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
/**判断是否支持Symbol和Reflect*/
var hasSymbol$1 =
  typeof Symbol !== 'undefined' && isNative$1(Symbol) &&
  typeof Reflect !== 'undefined' && isNative$1(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
/** 定义nextTick函数，异步执行的实现
 * 
*/
var nextTick$1 = (function () 
{
  /**回调函数数组 */
  var callbacks = [];
  /**挂起状态 */
  var pending = false;
  /** */
  var timerFunc;
  /**定义下一个时刻处理函数 
   * 根据浏览器的情况进行下一时刻处理函数的处理
  */
  function nextTickHandler () 
  {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) 
    {
      copies[i]();
    }
  }
  /**对于setImmediate不是未定义的且是原生的处理
   * 设置事件处理函数
   */
  if (typeof setImmediate !== 'undefined' && isNative$1(setImmediate)) 
  {
    timerFunc = function () {
      setImmediate(nextTickHandler);
    };
  } 
  /**如果对于MessageChannel不是未定义的处理，使用MessaeChannel */
  else if (typeof MessageChannel !== 'undefined' && (isNative$1(MessageChannel) ||MessageChannel.toString() === '[object MessageChannelConstructor]')) 
  {
    var channel = new MessageChannel();
    var port = channel.port2;
    channel.port1.onmessage = nextTickHandler;
    timerFunc = function () {
      port.postMessage(1);
    };
  } 
  /**对于没有以上两个函数的处理 */
  else
  {
    /* istanbul ignore next */
    /**对于有Promise的处理 */
    if (typeof Promise !== 'undefined' && isNative$1(Promise)) 
    {
      // use microtask in non-DOM environments, e.g. Weex
      var p = Promise.resolve();
      timerFunc = function () {
        p.then(nextTickHandler);
      };
    } 
    /**实在是啥也没有使用timeout处理 */
    else 
    {
      // fallback to setTimeout
      timerFunc = function () {
        setTimeout(nextTickHandler, 0);
      };
    }
  }
  /**返回任务回调函数入队函数，回调函数入队
   * cb:回调函数
   * ctx:参数
   */
  return function queueNextTick (cb, ctx) 
  {
    var _resolve;
    /**回调函数入队 */
    callbacks.push(function () {
      if (cb) 
      {
        try 
        {
          cb.call(ctx);
        } 
        catch (e) 
        {
          handleError(e, ctx, 'nextTick');
        }
      } 
      else if (_resolve) 
      {
        _resolve(ctx);
      }
    });
    if (!pending) 
    {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') 
    {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();
/**设置集合_Set
 * 如果支持Set使用原生的Set
 * 如果不支持Set实现Set方法
 */
var _Set$1;
if (typeof Set !== 'undefined' && isNative$1(Set)) 
{
  // use native Set when available.
  _Set$1 = Set;
} 
else 
{
  // a non-standard Set polyfill that only works with primitive keys.
  /**设置Set类匹配ISet */
  _Set$1 = (function () {
    function Set () 
    {
      this.set = Object.create(null);
    }
    /**has函数的实现 */
    Set.prototype.has = function has (key) 
    {
      return this.set[key] === true
    };
    /**add函数的实现 */
    Set.prototype.add = function add (key) 
    {
      this.set[key] = true;
    };
    /**clear函数的实现 */
    Set.prototype.clear = function clear () 
    {
      this.set = Object.create(null);
    };

    return Set;
  }());
}
/**定义接口类型ISet */

/*  */

function initProvide (vm) 
{
  var provide = vm.$options.provide;
  /**对于provide的属性存在且是函数的处理 */
  if (provide) 
  {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}
/**
 * 注射初始化
 * @param {*} vm 
 */
function initInjections (vm) 
{
  /**获取需要注射的数据 */
  var result = resolveInject(vm.$options.inject, vm);
  /**如果有需要注射的内容
   * 设置服务器的状态值为否
   * 对需要注射的数据进行遍历
   * 设置组件的对应属性的响应函数
   */
  if (result) 
  {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    observerState.shouldConvert = true;
  }
}
/**这个函数是获取需要注射的数据
 * inject：注射的数据
 * vm：组件对象，被注射的对象
 * 如果inject的值不为否
 * 创建一个空的对象
 * 根据hasSymbol进行处理，获取对象的所有可枚举属性
 * 遍历此对象的所有可枚举属性
 */
function resolveInject (inject, vm) 
{
  if (inject) 
  {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    /**获取注射对象的所有可枚举属性名 */
    var keys = hasSymbol$1
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);
    /**遍历所有注射对象的可枚举属性 */
    for (var i = 0; i < keys.length; i++) 
    {
      /**存储值 */
      var key = keys[i];
      /**存储此值的注射属性的from属性 */
      var provideKey = inject[key].from;
      var source = vm;
      /**遍历此组件的所有存在的父组件，如果vm不为否继续执行为否返回空的对象 */
      while (source) 
      {
        /**对于此组件有_provided属性且_provided属性中存在provideKey在向结果中添加此属性的值为 */
        if (source._provided && provideKey in source._provided) 
        {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      /**遍历完成之后如果注射组件中有default属性
       * 
       */
      if (!source) 
      {
        if ('default' in inject[key]) 
        {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } 
        else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */
/**config导入配置信息 */

/**
 * 初始化内部组件，即将组件挂载在父组件上
 * @param {*} vm 
 * @param {*} options 父组件对象
 */
function resolveConstructorOptions$1 (Ctor) 
{
  /**
   * 获取Ctor对象的option参数，其实这个参数是components,directives,filters和_base这四个属性其中_base这个属性执行这个函数
   * 当前这个对象是最简单的对象
   */
  var options = Ctor.options;
  /**对于此对象的super属性的值为真的处理，即此对象的父对象 */
  if (Ctor.super) 
  {
    /**获取父对象的option参数 */
    var superOptions = resolveConstructorOptions$1(Ctor.super);
    /**获取 */
    var cachedSuperOptions = Ctor.superOptions;
    /**对于当前的与缓存的不一致的处理
     * 更新缓存的数据
     */
    if (superOptions !== cachedSuperOptions) 
    {
      /**进行参数的更新 */
      Ctor.superOptions = superOptions;
      /**获取修改后的修改参数 */
      var modifiedOptions = resolveModifiedOptions$1(Ctor);
      /**对于存在有修改的参数的处理
       * 将修改的参数添加至扩展的参数中
       */
      if (modifiedOptions) 
      {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      /**设置参数为父的当前参数与扩展的参数进行合并操作 */
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      /**如果有name参数设置此的组件名称为当前对象 */
      if (options.name) 
      {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}
/**
 * 返回修改后对象
 * @param {*} Ctor Vue对象
 */
function resolveModifiedOptions$1 (Ctor) 
{
  var modified;
  /**此对象的当前值 */
  var latest = Ctor.options;
  /**此对象扩展的值 */
  var extended = Ctor.extendOptions;
  /**此对象 */
  var sealed = Ctor.sealedOptions;
  /**变量此对象当前的值
   * 对于当前的值不等于与的处理
   * 如果modified的值为假设置modified的值为空对象。
   * 设置modified对象的值为处理的值
   */
  for (var key in latest) 
  {
    if (latest[key] !== sealed[key]) 
    {
      if (!modified) 
      {
        modified = {};
      }
      modified[key] = dedupe$1(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}
/**
 * 这个函数的作用是根据当前值是否是数组进行处理
 * 如果不是数组直接返回此对象，
 * 如果是数组如果数组中的参数存在于扩展中获取不存在于封闭中添加此元素
 * @param {*} latest 当前的值
 * @param {*} extended 扩展的值
 * @param {*} sealed 封闭值
 */
function dedupe$1 (latest, extended, sealed) 
{
  /**对于当前的值为数组的处理
   * 创建空的对象
   * 遍历当前值的所有索引
   * 对于这个值存在于扩展中或者是不存在与sealed中将此值添加至创建的资源数组中并返回此数组
   * 对于当前值不是数组直接返回此数组
   */
  if (Array.isArray(latest)) 
  {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) 
    {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) 
      {
        res.push(latest[i]);
      }
    }
    return res
  } 
  else 
  {
    return latest
  }
}

/*  */



/**监听队列 */
var activatedChildren$1 = [];
/**has 监听器对象*/
function queueActivatedComponent$1 (vm) 
{
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren$1.push(vm);
}
/**设置监视器队列中所有的监视器的_iacctive的值为真，调用activateChildComponent函数 */

/*  */

function renderList (
  val,
  render
) 
{
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') 
  {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) 
    {
      ret[i] = render(val[i], i);
    }
  } 
  else if (typeof val === 'number') 
  {
    ret = new Array(val);
    for (i = 0; i < val; i++) 
    {
      ret[i] = render(i + 1, i);
    }
  } 
  else if (isObject(val)) 
  {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) 
    {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) 
  {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

function renderSlot (
  name,
  fallback,
  props,
  bindObject
) 
{
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) 
  { // scoped slot
    props = props || {};
    if (bindObject) 
    {
      if ("development" !== 'production' && !isObject(bindObject)) 
      {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    return scopedSlotFn(props) || fallback
  } 
  else 
  {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "development" !== 'production') 
    {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

function resolveFilter (id) 
{
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) 
{
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) 
  {
    if (Array.isArray(keyCodes)) 
    {
      return keyCodes.indexOf(eventKeyCode) === -1
    } 
    else 
    {
      return keyCodes !== eventKeyCode
    }
  } 
  else if (eventKeyName) 
  {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) 
{
  if (value) 
  {
    if (!isObject(value)) 
    {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } 
    else 
    {
      /**对于value的类型为数组的处理，设置value的值将其转换为数组的方式 */
      if (Array.isArray(value)) 
      {
        value = toObject(value);
      }
      var hash;
      /**变量value的所有属性 */
      var loop = function ( key ) {
        /**对于属性值为class或者是style或者是预留的处理
         * 设置hash的值为data
         */
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) 
        {
          hash = data;
        } 
        /**对于其他的处理
         * 设置type的值为data.attrs.type的值
         */
        else 
        {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) 
        {
          hash[key] = value[key];

          if (isSync) 
          {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) 
            {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) 
      loop( key );
    }
  }
  return data
}

/*  */

function renderStatic (
  index,
  isInFor
) 
{
  /**获取此对象的静态渲染函数 */
  var renderFns = this.$options.staticRenderFns;
  /**获取渲染的缓存 */
  var cached = renderFns.cached || (renderFns.cached = []);
  /**获取指定的渲染对象的缓存 */
  var tree = cached[index];
  /**对于tree的值不为空且isInFor的值为假的处理，将tree数组化 */
  if (tree && !isInFor) 
  {
    return Array.isArray(tree)
      ? cloneVNodes$1(tree)
      : cloneVNode$1(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = renderFns[index].call(this._renderProxy, null, this);
  /**标记为静态且不是只更新一次 */
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * 标记节点为静态且只渲染一次
 * @param {*} tree 节点
 * @param {*} index 索引值
 * @param {*} key 键名
 */
function markOnce (
  tree,
  index,
  key
) 
{
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}
/**
 * 标记节点为静态
 * @param {*} tree  虚拟节点
 * @param {*} key 属性键
 * @param {*} isOnce 是否只渲染一次
 */
function markStatic (
  tree,
  key,
  isOnce
) 
{
  /**对于tree的是值为数组的处理 */
  if (Array.isArray(tree)) 
  {
    /**变量tree的所有元素
     * 对于此元素存在且类型不是字符串的处理
     * 调用markStaticNode设置此元素的相关属性
     */
    for (var i = 0; i < tree.length; i++) 
    {
      if (tree[i] && typeof tree[i] !== 'string') 
      {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } 
  /**对于不是数组的处理 */
  else 
  {
    markStaticNode(tree, key, isOnce);
  }
}
/**
 * 设置节点相关属性，即标记节点为静态节点
 * @param {*} node 节点
 * @param {*} key 属性值
 * @param {*} isOnce 是否只渲染一次
 */
function markStaticNode (node, key, isOnce) 
{
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) 
{
  /**对于value的值为真的处理
   * 对于value的类型不是对象的处理警告
   * 对于value的类型是对象处理
   * 设置on的值为data.on或者是空的对象
   */
  if (value) 
  {
    if (!isPlainObject(value)) 
    {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } 
    else 
    {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) 
      {
        var existing = on[key];
        var ours = value[key];
        /**合并 */
        on[key] = existing ? [].concat(ours, existing) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode$1;
  target._e = createEmptyVNode$1;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) 
{
  /**获取组件的参数 */
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  /**根据传入的对象获取 */
  var contextVm = Object.create(parent);
  /**设置是否被编译过 */
  var isCompiled = isTrue(options._compiled);
  /**设置 */
  var needNormalization = !isCompiled;

  // support for compiled functional template
  /**对于编译的值为真的处理
   * 更新本对象的options参数
   */
  if (isCompiled) 
  {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }
  /**对于_scopeId的值为真的处理
   * 设置_c函数
   */
  if (options._scopeId) 
  {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.functionalScopeId = options._scopeId;
        vnode.functionalContext = parent;
      }
      return vnode
    };
  } 
  /**
   * 对于_scopeId的值为假的处理
   */
  else 
  {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}
/** */
installRenderHelpers(FunctionalRenderContext.prototype);
/**
 * 创建组件函数
 * @param {*} Ctor 组件类
 * @param {*} propsData props数据
 * @param {*} data 节点数据
 * @param {*} contextVm 组件
 * @param {*} children 子组件
 */
function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) 
{
  var options = Ctor.options;
  var props = {};
  /**获取组件中的props数据 */
  var propOptions = options.props;
  /**如果propOptions被定义
   * 变量其中的属性并将其添加至props对象中
   */
  if (isDef(propOptions)) 
  {
    for (var key in propOptions) 
    {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } 
  /**如果propOptions的值未定义的处理
   * 如果data.attrs被定义过将其中的属性添加至props中
   */
  else 
  {
    if (isDef(data.attrs))
    {
      mergeProps(props, data.attrs);
    }
    /**如果定义data.props将其中的属性添加至props中 */
    if (isDef(data.props)) 
    {
      mergeProps(props, data.props);
    }
  }
  /**创建新的渲染内容 */
  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );
  /**设置vnode的值为调用 */
  var vnode = options.render.call(null, renderContext._c, renderContext);
  /**如果vnode原型链中存在Vnode
   * 设置vnode
   */
  if (vnode instanceof VNode) 
  {
    vnode.functionalContext = contextVm;
    vnode.functionalOptions = options;
    if (data.slot) 
    {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}
/**聚合Props，
 * 将form中的可枚举属性添加至to中并将属性值转换为驼峰式
 * 将其中的属性转换为驼峰式 */
function mergeProps (to, from) 
{
  for (var key in from) 
  {
    to[camelize(key)] = from[key];
  }
}

/*  */

var componentVNodeHooks = 
{
  /**初始化 */
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) 
  {
    /**组件实例为假或者是组件实例被销毁为真的处理
     * 定义变量child的值为调用createComponentInstanceForVnode后的结果
     * 并将此挂载
     */
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) 
    {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } 
    /**如果数据的keepAlive属性值为真的处理
     * 调用prepatch函数
     */
    else if (vnode.data.keepAlive) 
    {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },
  /** */
  prepatch: function prepatch (oldVnode, vnode) 
  {
    /**设置options的值为vnode.componentOptions
     * 设置child的值为oldVnode.componentInstance
     * 调用更新子组件
     */
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },
  /**插入 */
  insert: function insert (vnode) 
  {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted)
     {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) 
    {
      if (context._isMounted) 
      {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent$1(componentInstance);
      } 
      else 
      {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },
  /**
   * 销毁组件
   * @param {*} vnode 节点对象 
   */
  destroy: function destroy (vnode) 
  {
    var componentInstance = vnode.componentInstance;
    /**组件实例的销毁状态为假的处理
     * 如果数据的keepAlive的属性为假调用组件实例的销毁函数
     * 反之调用deactivateChildComponent函数
     */
    if (!componentInstance._isDestroyed) 
    {
      if (!vnode.data.keepAlive) 
      {
        componentInstance.$destroy();
      } 
      else 
      {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};
/**钩子聚合 */
var hooksToMerge = Object.keys(componentVNodeHooks);
/**
 * 创建组件
 * @param {*} Ctor  组件
 * @param {*} data  节点数据
 * @param {*} context 内容
 * @param {*} children 子组件
 * @param {*} tag 标签
 */
function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) 
{
  /**如果Ctor对象是未定义的返回 */
  if (isUndef(Ctor)) 
  {
    return
  }
  /**设置baseCtor为组件的$options._base属性的值 */
  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  /**如果Ctor是对象设置Ctor的值为调用baseCtor.extend的结果 */
  if (isObject(Ctor)) 
  {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  /**如果Ctor的类型不是函数的处理，返回 */
  if (typeof Ctor !== 'function') 
  {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component 异步组件
  var asyncFactory;
  if (isUndef(Ctor.cid)) 
  {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) 
    {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions$1(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) 
  {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) 
  {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) 
  {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) 
    {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}
/**给节点创建组件实例
 * vnode:
 * parent:
 * parentElm:
 * refElm:
 * 返回组件对象
 */
function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) 
{
  var vnodeComponentOptions = vnode.componentOptions;
  var options = 
  {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  /**获取内联模板 */
  var inlineTemplate = vnode.data.inlineTemplate;
  /**对于内联模板的 */
  if (isDef(inlineTemplate)) 
  {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}
/**聚合钩子
 * data:节点数据
 */
function mergeHooks (data) 
{
  /**如果值为否创建一个空的钩子对象 */
  if (!data.hook) 
  {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) 
  {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}
/**合并钩子 */
function mergeHook$1 (one, two) 
{
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

/**
 * 
 * @param {*} options 
 * @param {*} data 
 */
function transformModel (options, data) 
{
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) 
  {
    on[event] = [data.model.callback].concat(on[event]);
  } 
  else 
  {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

/**
 * 创建DOM元素
 * @param {*} context 组件对象
 * @param {*} tag 标签
 * @param {*} data 数据
 * @param {*} children 子对象
 * @param {*} normalizationType 规范化模式
 * @param {*} alwaysNormalize 是否总是规范化模式
 */
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) 
{
  /**如果data为数组或者data是原始对象的处理
   * 设置normalizationType的值为children
   * children的值为data，data的值为未定义
   */
  if (Array.isArray(data) || isPrimitive(data)) 
  {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  /**如果alwaysNormalize的值为真的处理 */
  if (isTrue(alwaysNormalize)) 
  {
    normalizationType = ALWAYS_NORMALIZE;
  }
  /**调用创建元素函数进行真正的创建元素 */
  return _createElement(context, tag, data, children, normalizationType)
}
/**
 * 真正的创建DOM元素的函数
 * @param {*} context 组件对象
 * @param {*} tag 组件标签
 * @param {*} data 数据
 * @param {*} children 子对象
 * @param {*} normalizationType 规范化类型
 */
function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) 
{
  /**data定义且data的__ob__属性也被定义的处理，返回空的虚拟节点 */
  if (isDef(data) && isDef((data).__ob__)) 
  {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  /**如果data被定义且data的is属性被定义的处理
   * 设置tag的值为data的is属性值
   */
  if (isDef(data) && isDef(data.is)) 
  {
    tag = data.is;
  }
  /**如果tag的值不空的处理，返回空的虚拟节点 */
  if (!tag) 
  {
    return createEmptyVNode()
  }
  if ("development" !== 'production' &&isDef(data) && isDef(data.key) && !isPrimitive(data.key)) 
  {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  /**如果children为数组且第一个子对象为函数的处理
   * 设置data的scopedSlots的属性
   */
  if (Array.isArray(children) &&typeof children[0] === 'function') 
  {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  /**如果常规类型的值为ALWAYS_NORMALIZE
   * 设置children的值为调用normalizeChildren后的结果
   * 如果为SIMPLE_NORMALIZEchildren的值为调用simpleNormalizeChildren的结果
   */
  if (normalizationType === ALWAYS_NORMALIZE) 
  {
    children = normalizeChildren(children);
  } 
  else if (normalizationType === SIMPLE_NORMALIZE) 
  {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  /**如果tag的类型为字符串的处理 */
  if (typeof tag === 'string') 
  {
    var Ctor;
    /**设置ns的值为context.$vnode.ns或者是 */
    ns = (context.$vnode && context.$vnode.ns) || config$1.getTagNamespace(tag);
    if (config$1.isReservedTag(tag)) 
    {
      // platform built-in elements
      vnode = new VNode(
        config$1.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } 
    else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) 
    {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } 
    else 
    {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } 
  /**如果tag的类型不是字符串的处理 */
  else 
  {
    // direct component options / constructor
    /**设置vnode的值为创建组件后的值 */
    vnode = createComponent(tag, data, context, children);
  }
  /**如果vnode定义且ns的值为真调用applyNS函数，最终返回vnode
   * 反之返回调用createEmptyVNode的结果
  */
  if (isDef(vnode)) 
  {
    if (ns) 
    {
      applyNS(vnode, ns);
    }
    return vnode
  } 
  else 
  {
    return createEmptyVNode()
  }
}
/**
 * 
 * @param {*} vnode 
 * @param {*} ns 
 * @param {*} force 
 */
function applyNS (vnode, ns, force) 
{
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') 
  {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) 
  {
    for (var i = 0, l = vnode.children.length; i < l; i++) 
    {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) 
      {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) 
{
  vm._vnode = null; // the root of the child tree
  /**参数 */
  var options = vm.$options;
  /**父节点 */
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  /**父对象的内容 */
  var renderContext = parentVnode && parentVnode.context;
  /**确定槽的参数 */
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  /**设置槽范围的参数为空的对象 */
  vm.$scopedSlots = emptyObject;
  /**设置_c函数的方法为创建DOM元素*/
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  /**设置对象$createElement的属相为创建DOM元素 强制使用规范格式*/
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  /**获取父数据 */
  var parentData = parentVnode && parentVnode.data;
  /**给组件添加attrs和listeners的处理 */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}
/**渲染的混入
 * Vue：组件对象
 */
function renderMixin (Vue) 
{
  // install runtime convenience helpers
  /**安装转换助手 */
  installRenderHelpers(Vue.prototype);
  /**定义组件的nextTick的方法实现 */
  Vue.prototype.$nextTick = function (fn) 
  {
    return nextTick(fn, this)
  };
  /**定义Vue的渲染属性函数的处理 */
  Vue.prototype._render = function () 
  {
    var vm = this;
    /**解构获取对象的render属性值和_parentVnode属性值 */
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;
    /**对于组件被挂载的处理 */
    if (vm._isMounted) 
    {
      /**遍历组件的$slots的所有属性
       * 如果值的渲染属性为真深度的克隆此阐述到此组件的属性中
       */
      for (var key in vm.$slots) 
      {
        var slot = vm.$slots[key];
        /**对于已经被渲染的处理 */
        if (slot._rendered) 
        {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }
    /**设置组件的作用域插槽的值为父节点的数据属性中的作用域插槽或者是个空的对象 */
    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try 
    {
      /**调用call方法 */
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } 
    catch (e) 
    {
      handleError(e, vm, "render");
      {
        if (vm.$options.renderError) 
        {
          try 
          {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } 
          catch (e) 
          {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } 
        else 
        {
          vnode = vm._vnode;
        }
      }
    }
    /**vNode为渲染的对象，如果vnode的实例不是VNode */
    if (!(vnode instanceof VNode)) 
    {
      if ("development" !== 'production' && Array.isArray(vnode)) 
      {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */
/**config导入配置信息 */
var uid$1 = 0;
/**
 * Vue的实例化，定义Vue对象的_init方法
 * @param {*} Vue对象
 */
function initMixin (Vue) 
{
  /**
   * Vue的原型初始化函数
   * options：为传入的对象，对于根组件这个为传入的参数
   */
  Vue.prototype._init = function (options) 
  {
    var vm = this;
    /**定义使用的Vue实例的编号 */
    vm._uid = uid$1++;

    var startTag, endTag;
    if ("development" !== 'production' && config$1.performance && mark$1) 
    {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark$1(startTag);
    }
    /**设置当前对象为Vue */
    vm._isVue = true;
    /**options存在且options是组件初始化化此组件
     * 反之设置此Vue对象的options值为传入的options参数与此对象继承的options对象进行合并
     * 对于是组件的
     */
    if (options && options._isComponent) 
    {
      /**初始化内部组件 */
      initInternalComponent(vm, options);
    } 
    else 
    {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /**如果不是生产模式的处理 */
    {
      initProxy(vm);
    }
    /**设置_self属性的值为vm */
    vm._self = vm;
    /**初始化生命周期，初始化组件的相关参数 */
    initLifecycle(vm);
    /**初始化事件处理 */
    initEvents(vm);
    /**初始化渲染 */
    initRender(vm);
    /**使用钩子函数调用创建之前的过程 */
    callHook(vm, 'beforeCreate');
    /**初始化注入 */
    initInjections(vm); // resolve injections before data/props
    /**初始化状态 */
    initState(vm);
    /**初始化提供 */
    initProvide(vm); // resolve provide after data/props
    /**调用钩子函数创建的处理 */
    callHook(vm, 'created');
    /**如果不是生产模式且 */
    if ("development" !== 'production' && config$1.performance && mark$1) 
    {
      vm._name = formatComponentName(vm, false);
      mark$1(endTag);
      measure$1(("vue " + (vm._name) + " init"), startTag, endTag);
    }
    /**进行挂载 */
    if (vm.$options.el) 
    {
      vm.$mount(vm.$options.el);
    }
  };
}
/**
 * 初始化内部组件，即将组件挂载在父组件上
 * @param {*} vm 
 * @param {*} options 父组件对象
 */
function initInternalComponent (vm, options) 
{
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  /**内部组件的父组件 */
  opts.parent = options.parent;
  /**传输数据的通道 */
  opts.propsData = options.propsData;
  /**父组件的节点 */
  opts._parentVnode = options._parentVnode;
  /**父组件的监听器 */
  opts._parentListeners = options._parentListeners;
  /**父组件 */
  opts._renderChildren = options._renderChildren;
  /**组件标签 */
  opts._componentTag = options._componentTag;
  /**父元素 */
  opts._parentElm = options._parentElm;
  /***引用的元素 */
  opts._refElm = options._refElm;
  if (options.render) 
  {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
/**
 * 这个参数用于获取此对象的父对象的options参数
 * 这函数用于获取对象的options，子对象继承父对象的options对象
 * @param {*} Ctor Ctor其实是Vue函数的构造函数，这里指向的还是Vue对象
 */
function resolveConstructorOptions (Ctor) 
{
  /**
   * 获取Ctor对象的option参数，其实这个参数是components,directives,filters和_base这四个属性其中_base这个属性执行这个函数
   * 当前这个对象是最简单的对象
   */
  var options = Ctor.options;
  /**对于此对象的super属性的值为真的处理，即此对象的父对象 */
  if (Ctor.super) 
  {
    /**获取父对象的option参数 */
    var superOptions = resolveConstructorOptions(Ctor.super);
    /**获取 */
    var cachedSuperOptions = Ctor.superOptions;
    /**对于当前的与缓存的不一致的处理
     * 更新缓存的数据
     */
    if (superOptions !== cachedSuperOptions) 
    {
      /**进行参数的更新 */
      Ctor.superOptions = superOptions;
      /**获取修改后的修改参数 */
      var modifiedOptions = resolveModifiedOptions(Ctor);
      /**对于存在有修改的参数的处理
       * 将修改的参数添加至扩展的参数中
       */
      if (modifiedOptions) 
      {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      /**设置参数为父的当前参数与扩展的参数进行合并操作 */
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      /**如果有name参数设置此的组件名称为当前对象 */
      if (options.name) 
      {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}
/**
 * 返回修改后对象
 * @param {*} Ctor Vue对象
 */
function resolveModifiedOptions (Ctor) 
{
  var modified;
  /**此对象的当前值 */
  var latest = Ctor.options;
  /**此对象扩展的值 */
  var extended = Ctor.extendOptions;
  /**此对象 */
  var sealed = Ctor.sealedOptions;
  /**变量此对象当前的值
   * 对于当前的值不等于与的处理
   * 如果modified的值为假设置modified的值为空对象。
   * 设置modified对象的值为处理的值
   */
  for (var key in latest) 
  {
    if (latest[key] !== sealed[key]) 
    {
      if (!modified) 
      {
        modified = {};
      }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}
/**
 * 这个函数的作用是根据当前值是否是数组进行处理
 * 如果不是数组直接返回此对象，
 * 如果是数组如果数组中的参数存在于扩展中获取不存在于封闭中添加此元素
 * @param {*} latest 当前的值
 * @param {*} extended 扩展的值
 * @param {*} sealed 封闭值
 */
function dedupe (latest, extended, sealed) 
{
  /**对于当前的值为数组的处理
   * 创建空的对象
   * 遍历当前值的所有索引
   * 对于这个值存在于扩展中或者是不存在与sealed中将此值添加至创建的资源数组中并返回此数组
   * 对于当前值不是数组直接返回此数组
   */
  if (Array.isArray(latest)) 
  {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) 
    {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) 
      {
        res.push(latest[i]);
      }
    }
    return res
  } 
  else 
  {
    return latest
  }
}

function Vue$3 (options) 
{
  /**判断是否是使用New创建的vue */
  if (
    "development" !== 'production' &&
    !(this instanceof Vue$3)
  ) 
  {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  
  /**根据传入的数据进行Vue对象的初始化工作 */
  this._init(options);
}
/**
 * 这个应该是第一个函数
 * 给Vue对象添加_init方法
 */
initMixin(Vue$3);
/**状态绑定$watch函数 */
stateMixin(Vue$3);
/**事件方法 */
eventsMixin(Vue$3);
/**生命周期方法 */
lifecycleMixin(Vue$3);
/**渲染方法 */
renderMixin(Vue$3);

/*  */

function initUse (Vue) 
{
  Vue.use = function (plugin) 
  {
    /**获取这个对象已经安装的插件 */
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    /**对于插件在安全的组件中找到返回这个全局API对象 */
    if (installedPlugins.indexOf(plugin) > -1) 
    {
      return this
    }

    // additional parameters
    /**如果没有找到这个插件
     * 设置args的值为传入参数的从第二个开始到最后
     * 
     */
    var args = toArray(arguments, 1);
    args.unshift(this);
    /**对于插件的安装属性为函数的处理调用组件的安装 */
    if (typeof plugin.install === 'function') 
    {
      plugin.install.apply(plugin, args);
    } 
    /**如果插件的类型为函数，调用插件应用的函数 */
    else if (typeof plugin === 'function') 
    {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    /**返回全局API对象 */
    return this
  };
}

/*  */

function initMixin$2 (Vue) 
{
  Vue.mixin = function (mixin) 
  {
    /**将此对象的options属性与传入的对象进行混合并返回混合后的此对象 */
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) 
{
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  /**全局API的扩展，返回扩展的全局对象
   * extendOptions：扩展对象
   */
  Vue.extend = function (extendOptions) 
  {
    /**获取扩展的属性 */
    extendOptions = extendOptions || {};
    /**定义此对象 */
    var Super = this;
    /**定义此对象的cid */
    var SuperId = Super.cid;
    /**获取扩展对象的_Ctor相关 */
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    /**如果缓存的SuperID属性值为真返回此属性对象 */
    if (cachedCtors[SuperId]) 
    {
      return cachedCtors[SuperId]
    }
    /**获取扩展对象的名字 */
    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) 
      {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }
    /**定义减法
     * 调用此对象的初始化方法
     */
    var Sub = function VueComponent (options) 
    {
      this._init(options);
    };
    /**定义Sub对象的原型属性为创建的当前的原型属性 */
    Sub.prototype = Object.create(Super.prototype);
    /**定义构造函数 */
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    /**Sub对象的属性值为聚合当前的属性值和扩展的属性值 */
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    /**如果props属性为真初始化其props属性 */
    if (Sub.options.props) 
    {
      initProps$1(Sub);
    }
    /**如果计算属性为真初始化计算属性 */
    if (Sub.options.computed) 
    {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    /**设置扩展，混合和使用的方法 */
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    /**设置资源的 */
    ASSET_TYPES.forEach(function (type) 
    {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    /**如果name的值为真的处理 */
    if (name) 
    {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}
/**初始化Props
 * 获取对象的options.props属性值
 * 
 */
function initProps$1 (Comp) 
{
  var props = Comp.options.props;
  for (var key in props) 
  {
    proxy(Comp.prototype, "_props", key);
  }
}
/**初始化计算 */
function initComputed$1 (Comp) 
{
  var computed = Comp.options.computed;
  for (var key in computed) 
  {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) 
{
  ASSET_TYPES.forEach(function (type) {
    /**
     * Vue的一些方法的实现
     * id:为名字
     * definition：为传入的对象
     */
    Vue[type] = function (
      id,
      definition
    ) 
    {
      /**如果传入的definition的值为否的处理
       * 返回当前Vue对象的对应组件的对应方法的实现
       */
      if (!definition) 
      {
        return this.options[type + 's'][id]
      } 
      /**如果传入的参数的值不会空的处理 */
      else 
      {
        {
          if (type === 'component' && config$1.isReservedTag(id)) 
          {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        /**如果是组件且definition的类型为对象
         * 设置definition的name属性
         * 设置definition的值为调用自己的扩展方法后的值
         */
        if (type === 'component' && isPlainObject(definition)) 
        {
          definition.name = definition.name || id;
          /**options._base指向Vue对象自己，调用 */
          definition = this.options._base.extend(definition);
        }
        /**如果是指令且指令的类型为函数的处理
         * 设置definition的绑定属性和更新属性
         */
        if (type === 'directive' && typeof definition === 'function') 
        {
          definition = { bind: definition, update: definition };
        }
        /**设置对象的Vue对象的此属性的属性的值为definition，最后返回definition */
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

/*  */

function getComponentName (opts) 
{
  return opts && (opts.Ctor.options.name || opts.tag)
}
/**检测是否匹配 */
function matches (pattern, name) 
{
  if (Array.isArray(pattern)) 
  {
    return pattern.indexOf(name) > -1
  } 
  else if (typeof pattern === 'string') 
  {
    return pattern.split(',').indexOf(name) > -1
  } 
  else if (isRegExp(pattern)) 
  {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}
/**移除缓存中指定过滤的属性 */
function pruneCache (keepAliveInstance, filter) 
{
  /**从保持活跃的实例中获取相关参数 */
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  /**遍历cache遍历中的属性 */
  for (var key in cache) 
  {
    var cachedNode = cache[key];
    if (cachedNode) 
    {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) 
      {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}
/**删除指定为缓存属性
 * cache：缓存的虚拟节点
 * key:键
 * keys:
 * current:当前虚拟节点
 */
function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) 
{
  /**获取传入的属性
   * 当此缓存存在且不等于当前的虚拟节点销毁此组件实例
   * 设置此缓存的值为空并在keys中移除此key
   */
  var cached$$1 = cache[key];
  if (cached$$1 && cached$$1 !== current) 
  {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
/**导出默认 */
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () 
  {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () 
  {
    var this$1 = this;

    for (var key in this$1.cache) 
    {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: 
  {
    include: function include (val) 
    {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) 
    {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () 
  {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }

      var ref = this;
      var cache = ref.cache;
      var keys = ref.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */
/**vue-master\src\core\global-api */
function initGlobalAPI(Vue ) {
  // config
  var configDef = {};
  /**时间configDef的get方法，即获取配置的参数 */
  configDef.get = function () { return config$1; };
  /**对于开发环境为production的处理其实没有什么作用 */
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  /**定义Vue的config属性为默认的configDef属性 */
  Object.defineProperty(Vue, 'config', configDef);
  /**设置Vue的util属性的相关方法，warn extend mergeOptions defineRective */
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };
  /**定义一些方法 */
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;
  /**创建空的Vue对象的options的对象 */
  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  /**设置Vue对象的_base属性的值指向自己Vue本身 */
  Vue.options._base = Vue;
  /**对Vue的options属性的components属性和buildInComponents属性进行扩展 */
  extend(Vue.options.components, builtInComponents);
  /**初始化Use */
  initUse(Vue);
  /**初始化混入 */
  initMixin$2(Vue);
  /**初始化扩展 */
  initExtend(Vue);
  /**初始化资源注册 */
  initAssetRegisters(Vue);
}
/**end vue-master\src\core\global-api */

/**\vue-master\src\core\index.js */
initGlobalAPI(Vue$3);


/**设置vue的$isServer属性的访问方法 */
Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering$1
});


/**设置Vue的$ssrContext属性的访问方法 */
Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

/**定义Vue的版本 */
Vue$3.version = '2.5.0';
/**end \vue-master\src\core\index.js */

/*  */

var activeInstance$1 = null;

/**
 * 初始化生命周期
 * 设置组件对象的相关参数和初始化相关的参数
 * @param {*} vm 
 */

/**组件的生命周期混合，实现组件的更新，强制更新和销毁的实现 */

/**挂载组件,Vue对象$mount的具体实现
 * vm:组件对象
 * el:挂载的元素
 * hydrating：这个值一般很少用
 */
function mountComponent$1 (
  vm,
  el,
  hydrating
) 
{
  vm.$el = el;
  /** */
  if (!vm.$options.render) 
  {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||vm.$options.el || el) 
      {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } 
      else 
      {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  /**调用挂载回调函数 */
  callHook$1(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config$1.performance && mark$1) 
  {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark$1(startTag);
      var vnode = vm._render();
      mark$1(endTag);
      measure$1(("vue " + name + " render"), startTag, endTag);

      mark$1(startTag);
      vm._update(vnode, hydrating);
      mark$1(endTag);
      measure$1(("vue " + name + " patch"), startTag, endTag);
    };
  } 
  else 
  {
    /**定义组件更新的方法 */
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) 
  {
    vm._isMounted = true;
    callHook$1(vm, 'mounted');
  }
  return vm
}


/**在组件树中向上获取组件的状态，即获取组件的状态 */

/**暂停组件
 * vm：组件对象
 * direct:暂停标志
 */

/**调用钩子函数
 * vm：组件
 * hook：状态字符串
 */
function callHook$1 (vm, hook) {
  /**获取组件对应的钩子函数 */
  var handlers = vm.$options[hook];
  /**对于钩子函数存在的处理 */
  if (handlers) 
  {
    for (var i = 0, j = handlers.length; i < j; i++) 
    {
      try 
      {
        handlers[i].call(vm);
      } 
      catch (e) 
      {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  /**对于组件定义_hasHookEvent的处理 */
  if (vm._hasHookEvent) 
  {
    vm.$emit('hook:' + hook);
  }
}

/*  */

var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
/**接收值的属性 */
var acceptValue = makeMap('input,textarea,option,select,progress');
/**
 * 
 * @param {*} tag 
 * @param {*} type 
 * @param {*} attr 属性名称
 */
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';
/**
 * 判断是否是xlink
 * @param {*} name 
 */
var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};
/**
 * 获取xlink属性的值
 * @param {*} name 
 */
var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};
/**
 * 
 * @param {*} val 
 */
var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) 
  {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) 
    {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) 
  {
    if (parentNode.data) 
    {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}
/**
 * 聚合类数据
 * staticClass为父和子的静态类的合并
 * class为如果子的class属性不存在为父的class如果存在为子的class和父的class组成的数组
 * @param {*} child 节点
 * @param {*} parent 
 */
function mergeClassData (child, parent) 
{
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}
/**
 * 如果动态样式或者是静态样式有一个存在进行样式的和合并，反之返回空字符串
 * @param {*} staticClass 静态样式 
 * @param {*} dynamicClass 动态样式
 */
function renderClass (
  staticClass,
  dynamicClass
) 
{
  if (isDef(staticClass) || isDef(dynamicClass)) 
  {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}
/**
 * 如果两个字符串都不为空返回两个字符串的合并，反之返回存在的字符串
 * @param {*} a  字符串
 * @param {*} b  字符串
 */
function concat (a, b) 
{
  return a ? b ? (a + ' ' + b) : a : (b || '')
}
/**
 * 
 * @param {*} value 
 */
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
/**
 * 数组字符串化
 * @param {*} value 
 */
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
        res += ' ';
      }
      res += stringified;
    }
  }
  return res
}
/**
 * 对象的字符串化
 * @param {*} value 
 */
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

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
/**HTML标签 */
var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);
/**判断是否是预指令 */
var isPreTag = function (tag) { return tag === 'pre'; };
/**
 * 判断是否是预留指令 
 * @param {*} tag 
 */
var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};
/**
 * 
 * @param {*} tag 
 */
function getTagNamespace (tag) {
  if (isSVG(tag)) 
  {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') 
  {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
/**
 * 
 * @param {*} tag 
 */
function isUnknownElement (tag) 
{
  /**如果不是浏览器环境返回真 */
  if (!inBrowser$1) 
  {
    return true
  }
  /**如果是预留的标签返回假 */
  if (isReservedTag(tag)) 
  {
    return false
  }
  /**将标签小写转换 */
  tag = tag.toLowerCase();
  /**如果此标签存在于未知元素中返回此未知元素的值 */
  if (unknownElementCache[tag] != null) 
  {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  /**对于标签中有连接号的处理 */
  if (tag.indexOf('-') > -1) 
  {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  }
  /**对于不在在连接号的处理 */ 
  else 
  {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

function query (el) 
{
  if (typeof el === 'string') 
  {
    /**查询id 标签是否存在
     * 对于不存在进行警告，但是创建一个div的对象
     * 对于存在返回对象
     */
    var selected = document.querySelector(el);
    if (!selected) 
    {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } 
  else 
  {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  /**
   * 创建
   * @param {*} _ 
   * @param {*} vnode 
   */
  create: function create (_, vnode) 
  {
    registerRef(vnode);
  },
  /**
   * 更新
   * @param {*} oldVnode 
   * @param {*} vnode 
   */
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  /**
   * 销毁
   * @param {*} vnode 
   */
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};
/**
 * 注册Ref
 * @param {*} vnode 
 * @param {*} isRemoval 
 */
function registerRef (vnode, isRemoval) 
{
  /**获取组件的ref相关数据
   * 如果不存在退出
   */
  var key = vnode.data.ref;
  if (!key) 
  {
    return
  }
  /**获取组件对内容 */
  var vm = vnode.context;
  /**获取组件的组件实例或者是 */
  var ref = vnode.componentInstance || vnode.elm;
  /**设置refs的值为 */
  var refs = vm.$refs;
  /**根据传入的是移除的状态值进行处理 */
  if (isRemoval) 
  {
    /** */
    if (Array.isArray(refs[key])) 
    {
      remove(refs[key], ref);
    } 
    else if (refs[key] === ref) 
    {
      refs[key] = undefined;
    }
  } 
  /**对于移除状态不为真的处理 */
  else 
  {
    if (vnode.data.refInFor) 
    {
      if (!Array.isArray(refs[key])) 
      {
        refs[key] = [ref];
      } 
      else if (refs[key].indexOf(ref) < 0) 
      {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } 
    else 
    {
      refs[key] = ref;
    }
  }
}

/*  */


/**HTML标签 */
var isHTMLTag$1 = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG$1 = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);
/**判断是否是预指令 */

/**
 * 判断是否是预留指令 
 * @param {*} tag 
 */

/**
 * 
 * @param {*} tag 
 */




var isTextInputType$1 = makeMap('text,number,password,search,email,tel,url');

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType$1(typeA) && isTextInputType$1(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(
            config$1.ignoredElements.length &&
            config$1.ignoredElements.some(function (ignore) {
              return isRegExp(ignore)
                ? ignore.test(tag)
                : ignore === tag
            })
          ) &&
          config$1.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.functionalScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.functionalContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !vnodeToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  /**
   * 销毁指令
   * @param {*} vnode 
   */
  destroy: function unbindDirectives (vnode) 
  {
    updateDirectives(vnode, emptyNode);
  }
};
/**
 * 更新指令
 * @param {*} oldVnode  
 * @param {*} vnode 
 */
function updateDirectives (oldVnode, vnode) 
{
  /**对于新的对象的指令或者老的对象的值了的值为真的处理 */
  if (oldVnode.data.directives || vnode.data.directives) 
  {
    _update(oldVnode, vnode);
  }
}
/**
 * 更新的处理
 * @param {*} oldVnode 老的节点
 * @param {*} vnode 新的节点
 */
function _update (oldVnode, vnode) 
{
  /**设置是否创建变量 */
  var isCreate = oldVnode === emptyNode;
  /**设置是否销毁变量 */
  var isDestroy = vnode === emptyNode;
  /**获取老的指令 */
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  /**获取新的指令 */
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  /**指令添加队列 */
  var dirsWithInsert = [];
  /**更新指令队列 */
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  /**遍历所有新指令中的属性
   * 
   */
  for (key in newDirs) 
  {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    /**老指令不存在此指令的处理调用钩子函数进行绑定
     * 如果此已经被定义且被插入将其添加到指令插入队列中
    */
    if (!oldDir) 
    {
      // new directive, bind
      callHook$2(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) 
      {
        dirsWithInsert.push(dir);
      }
    } 
    /**对于新老指令中都存在此指令的处理
     * 调用更新钩子函数
     * 如果已经被定义且组件已经更新添加到更指令更新数组中
     */
    else 
    {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$2(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) 
      {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  /**对于有添加新的指令的处理
   * 设置插入函数
   * 根据是否是创建进行处
   * 如果是创建聚合节点的钩子函数
   * 反之调用插入函数进行插入
   */
  if (dirsWithInsert.length) 
  {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) 
      {
        callHook$2(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) 
    {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } 
    else 
    {
      callInsert();
    }
  }
  /**如果有更新指令进行节点的钩子函数的聚合 */
  if (dirsWithPostpatch.length) 
  {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) 
      {
        callHook$2(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }
  /**如果不是创建指令的处理
   * 变量所有的老的指令的属性
   * 如果此属性不存在于新的指令中设置去绑定操作
   */
  if (!isCreate) 
  {
    for (key in oldDirs) 
    {
      if (!newDirs[key]) 
      {
        // no longer present, unbind
        callHook$2(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);
/**
 * 指令的规则化处理
 * @param {*} dirs  指令数组
 * @param {*} vm  组件对象
 */
function normalizeDirectives$1 (
  dirs,
  vm
) 
{
  /**创建空的资源对象 */
  var res = Object.create(null);
  /**如果指令数组的值为假的处理，返回空的资源对象 */
  if (!dirs) 
  {
    return res
  }
  var i, dir;
  /**遍历指令数组中的内容
   * 如果其属性的modifiers的值为假设置其值为空的对象
   * 设置资源的对应资源名为对应属性的值
   * 设置指令数组的def的值为调用resolveAsset后的结果
   */
  for (i = 0; i < dirs.length; i++) 
  {
    dir = dirs[i];
    if (!dir.modifiers) 
    {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}
/**
 * 获取原始的指令名称
 * @param {*} dir 
 */
function getRawDirName (dir) 
{
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}
/**
 * 调用钩子函数
 * @param {*} dir 指令
 * @param {*} hook 钩子
 * @param {*} vnode 新的节点
 * @param {*} oldVnode 老的节点
 * @param {*} isDestroy 是否销毁
 */
function callHook$2 (dir, hook, vnode, oldVnode, isDestroy) 
{
  /**设置fn的值为指令的处理函数 */
  var fn = dir.def && dir.def[hook];
  if (fn) 
  {
    try 
    {
      /**调用指令处理函数 */
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } 
    catch (e) 
    {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE9$1 || isEdge$1) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;
/**
 * 根据输入的表达式转换为表达式
 * @param {*} exp 传入的属性  "{ fontSize: postFontSize + 'em' }"
 */
function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  /**
   * c为当前字符的值
   * prev为之前字符的值
   */
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) 
  {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) 
    {
      /**当前字符为单引号，之前字符不是反斜杠 */
      if (c === 0x27 && prev !== 0x5C) 
      {
        inSingle = false;
      }
    } 
    else if (inDouble) 
    {
      /**当前字符为双引号，之前字符不为反斜杠 */
      if (c === 0x22 && prev !== 0x5C) 
      {
        inDouble = false;
      }
    } 
    else if (inTemplateString) 
    {
      /**当前字符为反单引号，之前字符不是反斜杠 */
      if (c === 0x60 && prev !== 0x5C) 
      {
        inTemplateString = false;
      }
    } 
    else if (inRegex) 
    {
      /**当前字符为斜杠，之前字符不是反斜杠 */
      if (c === 0x2f && prev !== 0x5C) 
      {
        inRegex = false;
      }
    } 
    /**当前字符为竖杠之后的字符不是竖杠且之前的字符不是竖杠且curly的值为否且square的值为否且paren的值为否 */
    else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) 
    {
      if (expression === undefined) 
      {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } 
      else 
      {
        pushFilter();
      }
    } 
    else 
    {
      switch (c) 
      {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) 
      { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) 
        {
          p = exp.charAt(j);
          if (p !== ' ') 
          {
            break
          }
        }
        if (!p || !validDivisionCharRE.test(p)) 
        {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) 
  {
    expression = exp.slice(0, i).trim();
  } 
  else if (lastFilterIndex !== 0) 
  {
    pushFilter();
  }

  function pushFilter () 
  {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) 
  {
    for (i = 0; i < filters.length; i++) 
    {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}
/**
 * 
 * @param {*} exp 
 * @param {*} filter 
 */
function wrapFilter (exp, filter) 
{
  /**获取字符串中的左括号 */
  var i = filter.indexOf('(');
  /**没有找到的处理 */
  if (i < 0) 
  {
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } 
  /**找到的处理 */
  else 
  {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}
/**
 * 
 * @param {*} modules 
 * @param {*} key 
 */

/**
 * 向props数组中添加参数
 * @param {*} el 抽象元素
 * @param {*} name 属性名称
 * @param {*} value 属性值
 */
function addProp (el, name, value) 
{
  (el.props || (el.props = [])).push({ name: name, value: value });
}
/**
 * 向attr数组中添加参数
 * @param {*} el 
 * @param {*} name 
 * @param {*} value 
 */

/**
 * 向directive数组中添加参数
 * @param {*} el 对象
 * @param {*} name 
 * @param {*} rawName 
 * @param {*} value 
 * @param {*} arg 
 * @param {*} modifiers 
 */


/**
 * 添加处理函数
 * @param {*} el 
 * @param {*} name 
 * @param {*} value 
 * @param {*} modifiers 
 * @param {*} important 
 * @param {*} warn 
 */
function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) 
{
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) 
  {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) 
  {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) 
  {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) 
  {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } 
  else 
  {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) 
  {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } 
  else if (handlers) 
  {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } 
  else 
  {
    events[name] = newHandler;
  }
}
/**
 * 获取绑定的属性
 * @param {*} el DOM对象
 * @param {*} name 属性名称
 * @param {*} getStatic 获取静态状态
 */
function getBindingAttr (
  el,
  name,
  getStatic
) 
{
  /**获取绑定属性 */
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  /**对于绑定属性不为空的处理 */
  if (dynamicValue != null) 
  {
    /**返回处理之后的表达式 */
    return parseFilters(dynamicValue)
  } 
  /**对于 */
  else if (getStatic !== false) 
  {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) 
    {
      return JSON.stringify(staticValue)
    }
  }
}

/**
 * 获取或者是移除属性，返回对应属性的值
 * @param {*} el 对象
 * @param {*} name 指令名称
 * @param {*} removeFromMap 是否删除
 */
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) 
{
  var val;
  /**对于对象存在此属性的处理 */
  if ((val = el.attrsMap[name]) != null) 
  {
    /**获取属性列表 */
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) 
    {
      if (list[i].name === name) 
      {
        list.splice(i, 1);
        break
      }
    }
  }
  /**删除的处理 */
  if (removeFromMap) 
  {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * 产生组件模式
 * @param {*} el 
 * @param {*} value 
 * @param {*} modifiers 
 */
function genComponentModel (
  el,
  value,
  modifiers
) 
{
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;
  /**设置基本的表达式 */
  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) 
  {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) 
  {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * 根据传入的数值，设置其数值或是设置方法
 * @param {*} value 
 * @param {*} assignment 
 */
function genAssignmentCode (
  value,
  assignment
) 
{
  /**返回进行模块化处理结束后的值 */
  var res = parseModel(value);
  /**对于值不为空的处理设置value的值为assignment的值 */
  if (res.key === null) 
  {
    return (value + "=" + assignment)
  } 
  /**对于值为空的处理 */
  else 
  {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$2;
var expressionPos;
var expressionEndPos;


/**
 * 模块分析
 * @param {*} val 
 */
function parseModel (val) 
{
  /**获取字符串的长度 */
  len = val.length;
  /**对于字符串中不存在方括号的处理 */
  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) 
  {
    /**获取最后一个点号的位置 */
    index$2 = val.lastIndexOf('.');
    /**对于找到点号的处理
     * 设置exp为属性key为值
     */
    if (index$2 > -1) 
    {
      return {
        exp: val.slice(0, index$2),
        key: '"' + val.slice(index$2 + 1) + '"'
      }
    } 
    /**对于没有找到点号的处理 */
    else 
    {
      return {
        exp: val,
        key: null
      }
    }
  }
  /**对于存在方括号的处理 */
  str = val;
  index$2 = expressionPos = expressionEndPos = 0;

  while (!eof()) 
  {
    chr = next();
    /**对于是头字符的处理 */
    if (isStringStart(chr)) 
    {
      parseString(chr);
    } 
    /**对于是方括号的处理 */
    else if (chr === 0x5B) 
    {
      parseBracket(chr);
    }
  }
  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}
/**
 * 获取字符串的下一个字符的编码值
 */
function next () 
{
  return str.charCodeAt(++index$2)
}
/**
 * 判断是否到了字符串的结尾
 */
function eof () 
{
  return index$2 >= len
}
/**
 * 是否是字符串的开始，即判断传入的参数是否时单引号或者是双引号
 * @param {*} chr 
 */
function isStringStart (chr) 
{
  return chr === 0x22 || chr === 0x27
}
/**
 * 方括号的处理，返回找到匹配的方括号结束位置
 * @param {*} chr 
 */
function parseBracket (chr) 
{
  var inBracket = 1;
  expressionPos = index$2;
  while (!eof()) 
  {
    chr = next();
    if (isStringStart(chr)) 
    {
      parseString(chr);
      continue
    }
    /**对于是方括号的处理 */
    if (chr === 0x5B) 
    {
      inBracket++;
    }
    /**对于是方括号结束的处理 */
    if (chr === 0x5D) 
    {
      inBracket--;
    }
    if (inBracket === 0) 
    {
      expressionEndPos = index$2;
      break
    }
  }
}
/**
 * 字符串分析
 * 在字符串中寻找是否还有此字符
 * @param {*} chr 
 */
function parseString (chr) 
{
  var stringQuote = chr;
  /**一直循环到字符串结束 */
  while (!eof()) 
  {
    /**获取下一个字符的值 */
    chr = next();
    /**如果在后续的字符串中找到此字符退出 */
    if (chr === stringQuote) 
    {
      break
    }
  }
}

/*  */

var RANGE_TOKEN = '__r';
/**
 * 根据el的对应的属性进行相关的模式化处理，返回成功或者是失败
 * @param {*} el 元素对象
 * @param {*} dir 
 * @param {*} _warn 警告处理函数
 */

/*  */

function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE$1 ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive$1
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) 
{
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  /** */
  cssText.split(listDelimiter).forEach(function (item) 
  {
    if (item) 
    {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

/**
 * 获取data数据的style属性值
 * 并将此属性值转换为对象形式
 * 如果data的静态样式不存在返回样式
 * 如果静态样式存在返回静态样式和样式的合并
 * @param {*} data 
 */
function normalizeStyleData (data) 
{
  /**将传入数据的style属性转换为对象形式存放在style变量中 */
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

/**
 * 将字符串或者是数组转换为对象形式
 * @param {*} bindingStyle 
 */
function normalizeStyleBinding (bindingStyle) 
{
  if (Array.isArray(bindingStyle)) 
  {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') 
  {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}
/**
 * 
 * @param {*} vnode 
 * @param {*} checkChild 
 */
function getStyle (vnode, checkChild) 
{
  var res = {};
  var styleData;

  if (checkChild) 
  {
    var childNode = vnode;
    /**子组件是否具有组件 */
    while (childNode.componentInstance) 
    {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) 
      {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) 
  {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) 
  {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) 
    {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance$1;
  var transitionNode = activeInstance$1.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType$1(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent$1(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

function query$1 (el) 
{
  if (typeof el === 'string') 
  {
    /**查询id 标签是否存在
     * 对于不存在进行警告，但是创建一个div的对象
     * 对于存在返回对象
     */
    var selected = document.querySelector(el);
    if (!selected) 
    {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } 
  else 
  {
    return el
  }
}

/*  */

function shouldDecode (content, encoded) 
{
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\"/>";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
/** */
var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});
/**
 * 分析处理文本
 * @param {*} text 
 * @param {*} delimiters 
 */
function parseText (
  text,
  delimiters
) 
{
  /** */
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) 
  {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) 
  {
    index = match.index;
    // push text token
    if (index > lastIndex) 
    {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) 
  {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;
/**
 * 解码
 */
var he = {
  decode: function decode (html) 
  {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}
/**
 * 分析HTML
 * @param {*} html 
 * @param {*} options 
 */
function parseHTML (html, options) 
{
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) 
  {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();
  /**
   * 
   * @param {*} n 
   */
  function advance (n) 
  {
    index += n;
    html = html.substring(n);
  }
  /**
   * 分析开始标签
   */
  function parseStartTag () 
  {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }
  /**
   * 开始标签的处理
   * @param {*} match 
   */
  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }
  /**
   * 结束标签的处理
   * @param {*} tagName 
   * @param {*} start 
   * @param {*} end 
   */
  function parseEndTag (tagName, start, end) 
  {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE$1 = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE$1 = /[-.*+?^${}()|[\]\/\\]/g;
/** */
var buildRegex$1 = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE$1, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE$1, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});
/**
 * 分析处理文本
 * @param {*} text 
 * @param {*} delimiters 
 */
function parseText$1 (
  text,
  delimiters
) 
{
  /** */
  var tagRE = delimiters ? buildRegex$1(delimiters) : defaultTagRE$1;
  if (!tagRE.test(text)) 
  {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) 
  {
    index = match.index;
    // push text token
    if (index > lastIndex) 
    {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) 
  {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

/**
 * 产生组件模式
 * @param {*} el 
 * @param {*} value 
 * @param {*} modifiers 
 */


/**
 * 根据传入的数值，设置其数值或是设置方法
 * @param {*} value 
 * @param {*} assignment 
 */
function genAssignmentCode$1 (
  value,
  assignment
) 
{
  /**返回进行模块化处理结束后的值 */
  var res = parseModel$1(value);
  /**对于值不为空的处理设置value的值为assignment的值 */
  if (res.key === null) 
  {
    return (value + "=" + assignment)
  } 
  /**对于值为空的处理 */
  else 
  {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len$1;
var str$1;
var chr$1;
var index$3;
var expressionPos$1;
var expressionEndPos$1;


/**
 * 模块分析
 * @param {*} val 
 */
function parseModel$1 (val) 
{
  /**获取字符串的长度 */
  len$1 = val.length;
  /**对于字符串中不存在方括号的处理 */
  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len$1 - 1) 
  {
    /**获取最后一个点号的位置 */
    index$3 = val.lastIndexOf('.');
    /**对于找到点号的处理
     * 设置exp为属性key为值
     */
    if (index$3 > -1) 
    {
      return {
        exp: val.slice(0, index$3),
        key: '"' + val.slice(index$3 + 1) + '"'
      }
    } 
    /**对于没有找到点号的处理 */
    else 
    {
      return {
        exp: val,
        key: null
      }
    }
  }
  /**对于存在方括号的处理 */
  str$1 = val;
  index$3 = expressionPos$1 = expressionEndPos$1 = 0;

  while (!eof$1()) 
  {
    chr$1 = next$1();
    /**对于是头字符的处理 */
    if (isStringStart$1(chr$1)) 
    {
      parseString$1(chr$1);
    } 
    /**对于是方括号的处理 */
    else if (chr$1 === 0x5B) 
    {
      parseBracket$1(chr$1);
    }
  }
  return {
    exp: val.slice(0, expressionPos$1),
    key: val.slice(expressionPos$1 + 1, expressionEndPos$1)
  }
}
/**
 * 获取字符串的下一个字符的编码值
 */
function next$1 () 
{
  return str$1.charCodeAt(++index$3)
}
/**
 * 判断是否到了字符串的结尾
 */
function eof$1 () 
{
  return index$3 >= len$1
}
/**
 * 是否是字符串的开始，即判断传入的参数是否时单引号或者是双引号
 * @param {*} chr 
 */
function isStringStart$1 (chr) 
{
  return chr === 0x22 || chr === 0x27
}
/**
 * 方括号的处理，返回找到匹配的方括号结束位置
 * @param {*} chr 
 */
function parseBracket$1 (chr) 
{
  var inBracket = 1;
  expressionPos$1 = index$3;
  while (!eof$1()) 
  {
    chr = next$1();
    if (isStringStart$1(chr)) 
    {
      parseString$1(chr);
      continue
    }
    /**对于是方括号的处理 */
    if (chr === 0x5B) 
    {
      inBracket++;
    }
    /**对于是方括号结束的处理 */
    if (chr === 0x5D) 
    {
      inBracket--;
    }
    if (inBracket === 0) 
    {
      expressionEndPos$1 = index$3;
      break
    }
  }
}
/**
 * 字符串分析
 * 在字符串中寻找是否还有此字符
 * @param {*} chr 
 */
function parseString$1 (chr) 
{
  var stringQuote = chr;
  /**一直循环到字符串结束 */
  while (!eof$1()) 
  {
    /**获取下一个字符的值 */
    chr = next$1();
    /**如果在后续的字符串中找到此字符退出 */
    if (chr === stringQuote) 
    {
      break
    }
  }
}

/*  */

function baseWarn$1 (msg) {
  console.error(("[Vue compiler]: " + msg));
}
/**
 * 
 * @param {*} modules 
 * @param {*} key 
 */
function pluckModuleFunction$1 (
  modules,
  key
) 
{
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}
/**
 * 向props数组中添加参数
 * @param {*} el 抽象元素
 * @param {*} name 属性名称
 * @param {*} value 属性值
 */
function addProp$1 (el, name, value) 
{
  (el.props || (el.props = [])).push({ name: name, value: value });
}
/**
 * 向attr数组中添加参数
 * @param {*} el 
 * @param {*} name 
 * @param {*} value 
 */
function addAttr$1 (el, name, value) 
{
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}
/**
 * 向directive数组中添加参数
 * @param {*} el 对象
 * @param {*} name 
 * @param {*} rawName 
 * @param {*} value 
 * @param {*} arg 
 * @param {*} modifiers 
 */
function addDirective$1 (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) 
{
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

/**
 * 添加处理函数
 * @param {*} el 
 * @param {*} name 
 * @param {*} value 
 * @param {*} modifiers 
 * @param {*} important 
 * @param {*} warn 
 */
function addHandler$1 (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) 
{
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers && modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) 
  {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) 
  {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) 
  {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) 
  {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } 
  else 
  {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) 
  {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } 
  else if (handlers) 
  {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } 
  else 
  {
    events[name] = newHandler;
  }
}
/**
 * 获取绑定的属性
 * @param {*} el DOM对象
 * @param {*} name 属性名称
 * @param {*} getStatic 获取静态状态
 */
function getBindingAttr$1 (
  el,
  name,
  getStatic
) 
{
  /**获取绑定属性 */
  var dynamicValue =
    getAndRemoveAttr$1(el, ':' + name) ||
    getAndRemoveAttr$1(el, 'v-bind:' + name);
  /**对于绑定属性不为空的处理 */
  if (dynamicValue != null) 
  {
    /**返回处理之后的表达式 */
    return parseFilters(dynamicValue)
  } 
  /**对于 */
  else if (getStatic !== false) 
  {
    var staticValue = getAndRemoveAttr$1(el, name);
    if (staticValue != null) 
    {
      return JSON.stringify(staticValue)
    }
  }
}

/**
 * 获取或者是移除属性，返回对应属性的值
 * @param {*} el 对象
 * @param {*} name 指令名称
 * @param {*} removeFromMap 是否删除
 */
function getAndRemoveAttr$1 (
  el,
  name,
  removeFromMap
) 
{
  var val;
  /**对于对象存在此属性的处理 */
  if ((val = el.attrsMap[name]) != null) 
  {
    /**获取属性列表 */
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) 
    {
      if (list[i].name === name) 
      {
        list.splice(i, 1);
        break
      }
    }
  }
  /**删除的处理 */
  if (removeFromMap) 
  {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var platformMustUseProp;
function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
/**
 * 将HTML文本转换为抽象结构
 * @param {*} template HTML字符串，即模板字符串
 * @param {*} options 抽象结构体
 */

/**
 * 预指令的处理
 * 获取元素对象中的预处理的属性值，
 * 如果值不为NULL设置值的pre属性的值为真
 * @param {*} el 
 */
function processElement (element, options) 
{
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) 
  {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}
/**
 * 处理key属性
 * 如果此属性存在设置此元素的key属性的值为返回的表达式
 * @param {*} el 
 */
function processKey (el) {
  var exp = getBindingAttr$1(el, 'key');
  if (exp) 
  {
    if ("development" !== 'production' && el.tag === 'template') 
    {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}
/**
 * 处理ref属性
 * @param {*} el 
 */
function processRef (el) 
{
  /**获取此对象ref属性的值 */
  var ref = getBindingAttr$1(el, 'ref');
  /**对于值不为假的处理
   * 设置el的ref属性为ref属性的值
   * 设置refInFor，即是否有for属性
   */
  if (ref) 
  {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}
/**
 * for指令的处理
 * @param {*} el 
 */
function processFor (el) 
{
  var exp;
  if ((exp = getAndRemoveAttr$1(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}
/**
 * 
 * @param {*} el 
 */
function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}
/**
 * 
 * @param {*} el 
 */
function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr$1(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr$1(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr$1(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr$1(el, 'slot-scope'))) {
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr$1(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (!el.slotScope) {
        addAttr$1(el, 'slot', slotTarget);
      }
    }
  }
}
/**
 * 组件处理
 * @param {*} el 
 */
function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr$1(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr$1(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}
/**
 * 
 * @param {*} el 
 */
function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler$1(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode$1(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp$1(el, name, value);
        } else {
          addAttr$1(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler$1(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective$1(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText$1(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr$1(el, name, JSON.stringify(value));
    }
  }
}
/**
 * 判断此属性向上是否有for属性
 * @param {*} el 
 */
function checkInFor (el) {
  var parent = el;
  while (parent) 
  {
    if (parent.for !== undefined) 
    {
      return true
    }
    parent = parent.parent;
  }
  return false
}
/**
 * 
 * @param {*} name 
 */
function parseModifiers (name) 
{
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}
/**
 * 
 * @param {*} attrs 
 */
function makeAttrsMap (attrs) 
{
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) 
  {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE$1 && !isEdge$1
    ) 
    {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
/**
 * 判断是否是文本标签即是否是script和style标签
 * @param {*} el 
 */
function checkForAliasModel (el, value) 
{
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "type==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "type==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });
      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

var warn$3;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN$1 = '__r';
/**
 * 根据el的对应的属性进行相关的模式化处理，返回成功或者是失败
 * @param {*} el 元素对象
 * @param {*} dir 
 * @param {*} _warn 警告处理函数
 */
function model$3 (
  el,
  dir,
  _warn
) 
{
  warn$3 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') 
    {
      warn$3(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }
  /**对于是组件的处理 */
  if (el.component) 
  {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } 
  /**对于标签是select的处理 */
  else if (tag === 'select') 
  {
    genSelect$1(el, value, modifiers);
  } 
  /**对于标签是input且类型是复选框的处理 */
  else if (tag === 'input' && type === 'checkbox') 
  {
    genCheckboxModel$1(el, value, modifiers);
  } 
  /**对于是单选框的处理 */
  else if (tag === 'input' && type === 'radio') 
  {
    genRadioModel$1(el, value, modifiers);
  } 
  /**对于是input或者是textarea的处理 */
  else if (tag === 'input' || tag === 'textarea') 
  {
    genDefaultModel$1(el, value, modifiers);
  } 
  /**对于不是预留标签的处理 */
  else if (!config.isReservedTag(tag)) 
  {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } 
  /**其他的错误处理 */
  else {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}
/**
 * 
 * @param {*} el 
 * @param {*} value 
 * @param {*} modifiers 
 */
function genCheckboxModel$1 (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}
/**
 * 产生单选框模式
 * @param {*} el 元素对象
 * @param {*} value 
 * @param {*} modifiers 
 */
function genRadioModel$1 (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}
/**
 * 产生选择模式
 * @param {*} el 
 * @param {*} value 
 * @param {*} modifiers 
 */
function genSelect$1 (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}
/**
 * 产生默认模式
 * @param {*} el 
 * @param {*} value 
 * @param {*} modifiers 
 */
function genDefaultModel$1 (
  el,
  value,
  modifiers
) 
{
  /** */
  var type = el.attrsMap.type;
  /** */
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  /** */
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN$1
      : 'input';
  /**设置数值的表达式 */
  var valueExpression = '$event.target.value';
  if (trim) 
  {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) 
  {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) 
  {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) 
  {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

function text (el, dir) 
{
  if (dir.value) 
  {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) 
{
  if (dir.value) 
  {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model$3,
  text: text,
  html: html
};

/*  */

var isUnaryTag$1 = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag$1 = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag$1 = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag$1,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag$1,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var onRE$1 = /^@|^v-on:/;
var dirRE$1 = /^v-|^@|^:/;
var forAliasRE$1 = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE$1 = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE$1 = /:(.*)$/;
var bindRE$1 = /^:|^v-bind:/;
var modifierRE$1 = /\.[^.]+/g;

var decodeHTMLCached$1 = cached(he.decode);

// configurable state
var warn$4;
var delimiters$1;
var transforms$1;
var preTransforms$1;
var postTransforms$1;
var platformIsPreTag$1;
var platformMustUseProp$1;
var platformGetTagNamespace$1;


/**
 * 产生抽象元素
 * @param {*} tag 
 * @param {*} attrs 
 * @param {*} parent 
 */
function createASTElement$1 (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap$1(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
/**
 * 将HTML文本转换为抽象结构
 * @param {*} template HTML字符串，即模板字符串
 * @param {*} options 抽象结构体
 */
function parse$1 (
  template,
  options
) 
{
  warn$4 = options.warn || baseWarn$1;

  platformIsPreTag$1 = options.isPreTag || no;
  platformMustUseProp$1 = options.mustUseProp || no;
  platformGetTagNamespace$1 = options.getTagNamespace || no;

  transforms$1 = pluckModuleFunction$1(options.modules, 'transformNode');
  preTransforms$1 = pluckModuleFunction$1(options.modules, 'preTransformNode');
  postTransforms$1 = pluckModuleFunction$1(options.modules, 'postTransformNode');

  delimiters$1 = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;
  /**
   * 警告一次的处理，
   * 如果没有警告过进行警告，如果已经警告过不在进行警告
   * @param {*} msg 
   */
  function warnOnce (msg) {
    if (!warned) 
    {
      warned = true;
      warn$4(msg);
    }
  }
  /**
   * 
   * @param {*} element 
   */
  function endPre (element) 
  {
    // check pre state
    if (element.pre) 
    {
      inVPre = false;
    }
    if (platformIsPreTag$1(element.tag)) 
    {
      inPre = false;
    }
  }
  /**
   * 
   */
  parseHTML(template, {
    warn: warn$4,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) 
    {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace$1(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE$1 && ns === 'svg') 
      {
        attrs = guardIESVGBug$1(attrs);
      }

      var element = createASTElement$1(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag$1(element) && !isServerRendering$1()) {
        element.forbidden = true;
        "development" !== 'production' && warn$4(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms$1.length; i++) {
        element = preTransforms$1[i](element, options) || element;
      }

      if (!inVPre) {
        processPre$1(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag$1(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs$1(element);
      } else if (!element.processed) {
        // structural directives
        processFor$1(element);
        processIf$1(element);
        processOnce$1(element);
        // element-scope stuff
        processElement$1(element, options);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition$1(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions$1(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$1 = 0; i$1 < postTransforms$1.length; i$1++) {
        postTransforms$1[i$1](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE$1 &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag$1(currentParent) ? text : decodeHTMLCached$1(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText$1(text, delimiters$1))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}
/**
 * 预指令的处理
 * 获取元素对象中的预处理的属性值，
 * 如果值不为NULL设置值的pre属性的值为真
 * @param {*} el 
 */
function processPre$1 (el) 
{
  if (getAndRemoveAttr$1(el, 'v-pre') != null) 
  {
    el.pre = true;
  }
}
/**
 * 原始属性的处理
 * @param {*} el 
 */
function processRawAttrs$1 (el) 
{
  /**获取对象的属性数组 */
  var l = el.attrsList.length;
  /**对于数组长度大于0的处理
   * 将属性名和属性值组成的数组存储在el的attrs数组中
   */
  if (l) 
  {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) 
    {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } 
  /**对于el的预处理属性为假的处理，设置元素的plain属性为真 */
  else if (!el.pre) 
  {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}
/**
 * 处理元素
 * @param {*} element 
 * @param {*} options 
 */
function processElement$1 (element, options) 
{
  processKey$1(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef$1(element);
  processSlot$1(element);
  processComponent$1(element);
  for (var i = 0; i < transforms$1.length; i++) 
  {
    element = transforms$1[i](element, options) || element;
  }
  processAttrs$1(element);
}
/**
 * 处理key属性
 * 如果此属性存在设置此元素的key属性的值为返回的表达式
 * @param {*} el 
 */
function processKey$1 (el) {
  var exp = getBindingAttr$1(el, 'key');
  if (exp) 
  {
    if ("development" !== 'production' && el.tag === 'template') 
    {
      warn$4("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}
/**
 * 处理ref属性
 * @param {*} el 
 */
function processRef$1 (el) 
{
  /**获取此对象ref属性的值 */
  var ref = getBindingAttr$1(el, 'ref');
  /**对于值不为假的处理
   * 设置el的ref属性为ref属性的值
   * 设置refInFor，即是否有for属性
   */
  if (ref) 
  {
    el.ref = ref;
    el.refInFor = checkInFor$1(el);
  }
}
/**
 * for指令的处理
 * @param {*} el 
 */
function processFor$1 (el) 
{
  var exp;
  if ((exp = getAndRemoveAttr$1(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE$1);
    if (!inMatch) {
      "development" !== 'production' && warn$4(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE$1);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}
/**
 * 
 * @param {*} el 
 */
function processIf$1 (el) {
  var exp = getAndRemoveAttr$1(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition$1(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr$1(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr$1(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}
/**
 * 
 * @param {*} el 
 * @param {*} parent 
 */
function processIfConditions$1 (el, parent) {
  var prev = findPrevElement$1(parent.children);
  if (prev && prev.if) {
    addIfCondition$1(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$4(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}
/**
 * 
 * @param {*} children 
 */
function findPrevElement$1 (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$4(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}
/**
 * 
 * @param {*} el 
 * @param {*} condition 
 */
function addIfCondition$1 (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}
/**
 * 
 * @param {*} el 
 */
function processOnce$1 (el) {
  var once$$1 = getAndRemoveAttr$1(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}
/**
 * 
 * @param {*} el 
 */
function processSlot$1 (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr$1(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$4(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr$1(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$4(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr$1(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr$1(el, 'slot-scope'))) {
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr$1(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (!el.slotScope) {
        addAttr$1(el, 'slot', slotTarget);
      }
    }
  }
}
/**
 * 组件处理
 * @param {*} el 
 */
function processComponent$1 (el) {
  var binding;
  if ((binding = getBindingAttr$1(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr$1(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}
/**
 * 
 * @param {*} el 
 */
function processAttrs$1 (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE$1.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers$1(name);
      if (modifiers) {
        name = name.replace(modifierRE$1, '');
      }
      if (bindRE$1.test(name)) { // v-bind
        name = name.replace(bindRE$1, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler$1(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode$1(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp$1(el.tag, el.attrsMap.type, name)
        )) {
          addProp$1(el, name, value);
        } else {
          addAttr$1(el, name, value);
        }
      } else if (onRE$1.test(name)) { // v-on
        name = name.replace(onRE$1, '');
        addHandler$1(el, name, value, modifiers, false, warn$4);
      } else { // normal directives
        name = name.replace(dirRE$1, '');
        // parse arg
        var argMatch = name.match(argRE$1);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective$1(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel$1(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText$1(value, delimiters$1);
        if (expression) {
          warn$4(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr$1(el, name, JSON.stringify(value));
    }
  }
}
/**
 * 判断此属性向上是否有for属性
 * @param {*} el 
 */
function checkInFor$1 (el) {
  var parent = el;
  while (parent) 
  {
    if (parent.for !== undefined) 
    {
      return true
    }
    parent = parent.parent;
  }
  return false
}
/**
 * 
 * @param {*} name 
 */
function parseModifiers$1 (name) 
{
  var match = name.match(modifierRE$1);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}
/**
 * 
 * @param {*} attrs 
 */
function makeAttrsMap$1 (attrs) 
{
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) 
  {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE$1 && !isEdge$1
    ) 
    {
      warn$4('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
/**
 * 判断是否是文本标签即是否是script和style标签
 * @param {*} el 
 */
function isTextTag$1 (el) {
  return el.tag === 'script' || el.tag === 'style'
}
/**
 * 
 * @param {*} el 
 */
function isForbiddenTag$1 (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug$1 = /^xmlns:NS\d+/;
var ieNSPrefix$1 = /^NS\d+:/;

/**
 * 
 * @param {*} attrs 
 */
function guardIESVGBug$1 (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug$1.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix$1, '');
      res.push(attr);
    }
  }
  return res
}
/**
 * 
 * @param {*} el 
 * @param {*} value 
 */
function checkForAliasModel$1 (el, value) 
{
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$4(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
/** */
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = 
{
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};
/**
 * 参数处理代码
 * @param {*} events 
 * @param {*} isNative 
 * @param {*} warn 
 */
function genHandlers (
  events,
  isNative,
  warn
) 
{
  /**根据传入的isNative进行处理 设置res的值 */
  var res = isNative ? 'nativeOn:{' : 'on:{';
  /**变量事件属性 */
  for (var name in events) 
  {
    /**获取事件值 */
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if ("development" !== 'production' &&
      name === 'click' &&
      handler && handler.modifiers && handler.modifiers.right
    ) 
    {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    /**字符串转换 */
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  /**生成最终的字符串 */
  return res.slice(0, -1) + '}'
}
/**
 * 产生处理代码
 * @param {*} name 事件名称
 * @param {*} handler 事件处理函数
 */
function genHandler (
  name,
  handler
) 
{
  /**如果事件处理函数的值为假返回空函数 */
  if (!handler) 
  {
    return 'function(){}'
  }
  /**如果事件处理函数是数组的处理 */
  if (Array.isArray(handler)) 
  {
    /**返回数组处理的形式 */
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) 
  {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } 
  else 
  {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) 
    {
      if (modifierCode[key]) 
      {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) 
        {
          keys.push(key);
        }
      } 
      else if (key === 'exact') 
      {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } 
      else 
      {
        keys.push(key);
      }
    }
    if (keys.length) 
    {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) 
    {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}
/**
 * 产生键值过滤器代码
 * @param {*} keys 
 */
function genKeyFilter (keys) 
{
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}
/**
 * 产生过滤代码
 * @param {*} key 
 */
function genFilterCode (key) 
{
  /**将key转换为10进制的整数 */
  var keyVal = parseInt(key, 10);
  /**如果转换的值为真的处理
   * 返回
   */
  if (keyVal) 
  {
    return ("$event.keyCode!==" + keyVal)
  }
  /**设置code的值在 */
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) 
{
  if ("development" !== 'production' && dir.modifiers) 
  {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */
/**
 * 
 * @param {*} el 
 * @param {*} dir 
 */
function bind$1 (el, dir) 
{
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) 
{
  this.options = options;
  this.warn = options.warn || baseWarn$1;
  this.transforms = pluckModuleFunction$1(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction$1(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};
/**
 * 上升代码的结果的结构
 */

/**
 * 代码产生的主体函数
 * @param {*} ast 元素抽象结构
 * @param {*} options 编译参数
 */
function generate (
  ast,
  options
) 
{
  /**创建新的编译器状态对象 */
  var state = new CodegenState(options);
  /** */
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}
/**
 * 
 * @param {*} el 
 * @param {*} state 
 */
function genElement (el, state) 
{
  if (el.staticRoot && !el.staticProcessed) 
  {
    return genStatic(el, state)
  } 
  else if (el.once && !el.onceProcessed) 
  {
    return genOnce(el, state)
  } 
  else if (el.for && !el.forProcessed) 
  {
    return genFor(el, state)
  } 
  else if (el.if && !el.ifProcessed) 
  {
    return genIf(el, state)
  } 
  else if (el.tag === 'template' && !el.slotTarget) 
  {
    return genChildren(el, state) || 'void 0'
  } 
  else if (el.tag === 'slot') 
  {
    return genSlot(el, state)
  } 
  else 
  {
    // component or element
    var code;
    if (el.component) 
    {
      code = genComponent(el.component, el, state);
    } 
    else 
    {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) 
    {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

/**
 * 
 * @param {*} el 
 * @param {*} state 
 */
function genStatic (el, state) 
{
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

/**
 * 
 * @param {*} el 
 * @param {*} state 
 */
function genOnce (el, state) 
{
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}
/**
 * v-if指令的实现
 * @param {*} el 
 * @param {*} state 
 * @param {*} altGen 
 * @param {*} altEmpty 
 */
function genIf (
  el,
  state,
  altGen,
  altEmpty
) 
{
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}
/**
 * v-if的具体的实现
 * @param {*} conditions 抽象的数据的对象
 * @param {*} state  CodegenState对象实例
 * @param {*} altGen 
 * @param {*} altEmpty 
 */
function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) 
{
  if (!conditions.length) 
  {
    return altEmpty || '_e()'
  }
  /**获取一个参数 */
  var condition = conditions.shift();
  /**获取关联的参数，对于有关联的参数的处理 */
  if (condition.exp) 
  {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } 
  /**对于没有关联的参数的处理 */
  else 
  {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  /**
   * 
   * @param {*} el 
   */
  function genTernaryExp (el) 
  {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}
/**
 * 
 * @param {*} el 
 * @param {*} state 
 * @param {*} altGen 
 * @param {*} altHelper 
 */
function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}
/**
 * 产生数据
 * @param {*} el 
 * @param {*} state 
 */
function genData$2 (el, state) 
{
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}
/**
 * 产生槽
 * @param {*} el 
 * @param {*} state 
 */
function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
/**
 * 产生组件
 * @param {*} componentName  组件名称
 * @param {*} el  dom属性
 * @param {*} state 状态值
 */
function genComponent (
  componentName,
  el,
  state
) 
{
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}
/**
 * 
 * @param {*} props 属性
 */
function genProps (props) 
{
  var res = '';
  for (var i = 0; i < props.length; i++) 
  {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
/**
 * 
 * @param {*} text 文本字符串 
 */
function transformSpecialNewlines (text) 
{
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE$1.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE$1.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

var warn$5 = noop;
var tip$1 = noop;
var generateComponentTrace$1 = (noop); // work around flow check
var formatComponentName$1 = (noop);
/**如果开发环境不是生产模式的处理 */
{
  /**判断是否有定义console */
  var hasConsole$1 = typeof console !== 'undefined';
  /** */
  var classifyRE$1 = /(?:^|[-_])(\w)/g;
  var classify$1 = function (str) { return str
    .replace(classifyRE$1, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };
  /**警告函数 */
  warn$5 = function (msg, vm) {
    var trace = vm ? generateComponentTrace$1(vm) : '';
    /**对于有警告处理函数的处理，使用警告处理函数 */
    if (config$1.warnHandler) 
    {
      config$1.warnHandler.call(null, msg, vm, trace);
    } 
    /**对于没有警告处理函数的处理使用控制台输出 */
    else if (hasConsole$1 && (!config$1.silent)) 
    {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };
  /**提示函数的实现 */
  tip$1 = function (msg, vm) {
    if (hasConsole$1 && (!config$1.silent)) 
    {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace$1(vm) : ''
      ));
    }
  };
  /**格式化组件名称函数 */
  formatComponentName$1 = function (vm, includeFile) {
    /**对于是根组件的处理 */
    if (vm.$root === vm) 
    {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) 
    {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify$1(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };
  /**重复函数的实现，将字符串重复多次 */
  var repeat$1 = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };
  /**产生组件追踪 */
  generateComponentTrace$1 = function (vm) {
    /**对于组件是 */
    if (vm._isVue && vm.$parent) 
    {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) 
      {
        /**对于树的长度大于0的处理 */
        if (tree.length > 0) 
        {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) 
          {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } 
          else if (currentRecursiveSequence > 0) 
          {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        /**向树中添加对象并设置vm为当前vm的父对象 */
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat$1(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName$1(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName$1(vm))); })
        .join('\n')
    } 
    else 
    {
      return ("\n\n(found in " + (formatComponentName$1(vm)) + ")")
    }
  };
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn$5;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip$1(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) 
{
  var ast = parse$1(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query$1(id);
  return el && el.innerHTML
});
/**设置mount为Vue中的mount的实现 */
var mount = Vue$3.prototype.$mount;
/**
 * 实现Vue的mount方法
 * el:DOM元素的挂载点
 * hydrating:
 */
Vue$3.prototype.$mount = function (
  el,
  hydrating
) 
{
  /**获取此字符串或者是DOM对象 */
  el = el && query$1(el);

  /**对于DOM对象是body对象或者是文档对象的处理 */
  if (el === document.body || el === document.documentElement) 
  {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  /**对于对象的渲染不存在的处理 */
  if (!options.render) 
  {
    var template = options.template;
    /**对于传入的对象有template属性的处理 */
    if (template) 
    {
      /**如果template的类型是字符串的的处理 */
      if (typeof template === 'string') 
      {
        /**对于第一个字符为#好的处理 */
        if (template.charAt(0) === '#') 
        {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) 
          {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } 
      /**如果具有nodetype属性返回模板的内部html */
      else if (template.nodeType) 
      {
        template = template.innerHTML;
      } 
      /**返回此对象 */
      else 
      {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    }
    /**对于DOM元素存在的处理获取此元素的HTML文本 */ 
    else if (el) 
    {
      template = getOuterHTML(el);
    }
    /**对于传入的对象有template属性的处理 */
    if (template) 
    {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) 
      {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) 
      {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  /**返回调用此函数进行挂载的处理 */
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
/**
 * 返回此DOM元素的HTML样式
 * @param {*} el 
 */
function getOuterHTML (el) 
{
  /**对于DOM元素具有outHTML属性的返回此属性的值 */
  if (el.outerHTML) 
  {
    return el.outerHTML
  } 
  /**对于没有outHTML属性的创建一个div元素并在此元素后面添加传入DOM元素的扩展
   * 返回此元素的HTML
   */
  else 
  {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}
/**定义compile的值为compileToFunctions */
Vue$3.compile = compileToFunctions;

return Vue$3;

})));
