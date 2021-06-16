let flag1 = Symbol.for("jifukui");
class obj{
    #type="object";
    static name = "jifukui"
    constructor(name){
        this.name=name;
        this[flag1]="jifukuitest"
    }
}

class animal extends obj{
    static num = 0;
    constructor(leg){
        super("bird");
        this.leg = leg 
        this.number =  animal.num++;
    }
}
let bird = new animal(7);
console.log(bird.leg);
console.log(bird.name);
console.log(bird.number)
console.log(bird[flag1])
let bird1 = new animal(8);
console.log(bird1.leg);
console.log(bird1.name);
console.log(bird1.number);