let data = new Map();
data.set({
    name:"cc",
    flag:true
})
data.set({
    name:"ee",
    flag:false
})
data.set({
    name:"ww",
    flag:true
})
data.set({
    name:"vv",
    flag:false
})
data.set({
    name:"rr",
    flag:true
})
data.set({
    name:"aa",
    flag:true
})
console.dir(data);
let value = Array.from(data);
console.log(value);
let ji = value.sort((n1,n2)=>{
    n1 = n1[0];
    n2 = n2[0];
    if(n1.flag==n2.flag){
        return n1.name>n2.name?0:-1;
    }
    else{
        return n1.flag?-1:0;
    }
})
console.log(ji);