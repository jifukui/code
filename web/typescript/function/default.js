var jiprint = console.log;
{
    var add = void 0;
    add = function name(v1, v2, v3) {
        if (v3 === void 0) { v3 = 0; }
        var result;
        result = v1 + v2 + v3;
        return result;
    };
    jiprint(add(2, 3, 5));
    jiprint(add(9, 14));
}
