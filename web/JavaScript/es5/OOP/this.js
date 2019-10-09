var person=new Object();
person.name="jifukui";
person.age=29;
person.job="CTO"
person.sayName=function()
{
    console.log(this.name);
}
person.sayName();