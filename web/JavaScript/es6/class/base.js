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
    print(a.constructor===point.prototype.constructor);
}