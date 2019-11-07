const jiprint=console.log;
class Email{
    public email:string;
    constructor(email:string){
        if(this.validateEmail(email))
        {
            this.email=email;
        }
        else
        {
            throw new Error("Invalid email!");
        }
    }
    private validateEmail(email:string)
    {
        let re=/\S+@\S+\.\S+/;
        return re.test(email);
    }
    public get():string{
        return this.email;
    }
}
class Person{
    public name:string;
    public surname:string;
    public email:Email;
    constructor(name:string,surname:string,email:Email)
    {
        this.email=email;
        this.name=name;
        this.surname=surname;
    }
    greet()
    {
        jiprint("Hi!");
    }
}
{
    jiprint("没有进行重载,只是简单地添加功能");
    class Teacher extends Person{
        say()
        {
            jiprint("Hello I is a Teacher");
        }
    }
    let data:Teacher=new Teacher("luck","mask",new Email("805013834@qq.com"));
    jiprint(data.email.get());
    data.greet();
    data.say();
}
{
    jiprint("进行重新的定义构造函数");
    class Teacher extends Person
    {
        public subobject:string;
        constructor(name:string,surname:string,email:Email,subobject:string)
        {
            super(name,surname,email);
            this.subobject=subobject;
        }    
        oldgeet()
        {
            super.greet();
        }
        greet()
        {
            jiprint(`My subobject is ${this.subobject}`)
        }
    }
    let data:Teacher=new Teacher("luck","mask",new Email("805013834@qq.com"),"English");
    jiprint(data.email.get());
    data.greet();
    data.oldgeet();
}
