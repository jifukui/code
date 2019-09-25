let [a,b,c]=[1,2,3]
console.log(a);
console.log(b);
console.log(c);
let [x,y]=[1]
console.log(x);
console.log(y);
{
    let [a,,c]=[1,2,3]
    console.log(a);
    console.log(c);
}
{
    let [a,...c]=[1,2,3]
    console.log(a);
    console.log(c);
}
{
    let [a,...c]=[1]
    console.log(a);
    console.log(c);
}
{
    let [a,c=4]=[1]
    console.log(a);
    console.log(c);
}