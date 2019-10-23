const a=10;
// a=11;//error
const b={};
b.a=2;
b.b=3;
console.log(b.a);
console.log(b.b);
{
    //console.log(a); //error
    const a=11;
    console.log(a);
}