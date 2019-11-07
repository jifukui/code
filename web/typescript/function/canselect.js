var jiprint = console.log;
{
    var add = void 0;
    add = function name(v1, v2, v3) {
        var result;
        result = v1 + v2;
        if (v3) {
            result += v3;
        }
        return result;
    };
    jiprint(add(2, 3, 5));
    jiprint(add(9, 14));
}
