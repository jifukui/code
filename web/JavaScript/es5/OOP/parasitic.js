function Person(name,age,job){
    var o=new Object();
    o.name=name;
    o.age=age;
    o.job=job;
    o.sayName=function(){
        console.log(this.name);
    };
    return o;
};
var p1=new Person("jsoon",23,"software");
p1.sayName();