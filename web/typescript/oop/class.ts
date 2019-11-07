const jiprint=console.log;
{
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
    var data:Person=new Person("luck","mask",new Email("805013834@qq.com"));
    var value:Email=new Email("805013833@qq.com");
    var value2:Person=new Person("dada","hahha",value);
    jiprint("data");
    jiprint(data.email.get());
    data.greet();
    //var value1:Email=new Email("805013833qq.com");//抛出错误
    jiprint("value")
    jiprint(value.get());
    //jiprint(value.validateEmail("8050138333@qq.com"))//错误
    jiprint("Value2");
    jiprint(value2.email.get());
    value2.greet();
}