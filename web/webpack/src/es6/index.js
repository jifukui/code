let data = [1,2,3,4,5,6,7,8,9]
function getvalue(){
    let value;
    value = data.map(val=>{
        return val-1;
    });
    console.log(`the value is ${value.toString()}`)
}
getvalue();