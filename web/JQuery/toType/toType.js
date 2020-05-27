//对象
 class2type ={};
//转换为字符串
toString =class2type.toString;
/**
 * 返回传入的obj的数据类型
 * @param {*} obj 
 */
function toType( obj ) {
	//对象为空返回"null"
	if ( obj == null ) {
		return obj + "";
	}
	//obj类型为对象
	return typeof obj === "object" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}

//export default toType;
var a={}
toType(a);