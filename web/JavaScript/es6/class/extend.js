const print=console.log;
{
    class point{
        constructor(x,y)
        {
            this.x=x;
            this.y=y;
        }
        toString(){
            return `(${this.x},${this.y})`
        }
    }
    let a=new point(2,9);
    print(a.toString());
    class colorpoint extends point{
        constructor(x,y,color){
            super(x,y);
            this.color=color;
        }
        toString(){
            return super.toString() +` color is ${this.color}`
        }
    }
    let b=new colorpoint(5,8,"red");
    print(b.toString());
}