class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
        return new Proxy(this,{
            get(obj,prob){
                return prob in obj?obj[prob]:"jifukui"
            }
        });
    }
    Display(){
        console.log(this.name);
    }
}
let guan = new Person("关点",41);
console.log(`name ${guan.name} age ${guan.age}`);
guan.Display();