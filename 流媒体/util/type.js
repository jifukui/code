function GetType(val){
    return Object.prototype.toString.call(val);
}
exports.GetType = GetType;