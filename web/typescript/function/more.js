var jiprint = console.log;
{
    var add = void 0;
    add = function name() {
        var arr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arr[_i] = arguments[_i];
        }
        var result = 0;
        for (var i = 0; i < arr.length; i++) {
            result += arr[i];
        }
        return result;
    };
    jiprint(add(1));
    jiprint(add(1, 2));
    jiprint(add(1, 2, 3));
    jiprint(add(1, 2, 3, 4));
    jiprint(add(1, 2, 3, 4, 5));
}
{
    var add = void 0;
    add = function name(arr) {
        var result = 0;
        for (var i = 0; i < arr.length; i++) {
            result += arr[i];
        }
        return result;
    };
    jiprint(add([1]));
    jiprint(add([1, 2]));
    jiprint(add([1, 2, 3]));
    jiprint(add([1, 2, 3, 4]));
    jiprint(add([1, 2, 3, 4, 5]));
}
