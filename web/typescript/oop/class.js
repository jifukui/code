var jiprint = console.log;
{
    var Email = /** @class */ (function () {
        function Email(email) {
            if (this.validateEmail(email)) {
                this.email = email;
            }
            else {
                throw new Error("Invalid email!");
            }
        }
        Email.prototype.validateEmail = function (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        };
        Email.prototype.get = function () {
            return this.email;
        };
        return Email;
    }());
    var Person = /** @class */ (function () {
        function Person(name, surname, email) {
            this.email = email;
            this.name = name;
            this.surname = surname;
        }
        Person.prototype.greet = function () {
            jiprint("Hi!");
        };
        return Person;
    }());
    var data = new Person("luck", "mask", new Email("805013834@qq.com"));
    var value = new Email("805013833@qq.com");
    var value2 = new Person("dada", "hahha", value);
    jiprint("data");
    jiprint(data.email.get());
    data.greet();
    //var value1:Email=new Email("805013833qq.com");//抛出错误
    jiprint("value");
    jiprint(value.get());
    //jiprint(value.validateEmail("8050138333@qq.com"))//错误
    jiprint("Value2");
    jiprint(value2.email.get());
    value2.greet();
}
