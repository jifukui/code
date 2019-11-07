var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var jiprint = console.log;
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
{
    jiprint("没有进行重载,只是简单地添加功能");
    var Teacher = /** @class */ (function (_super) {
        __extends(Teacher, _super);
        function Teacher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Teacher.prototype.say = function () {
            jiprint("Hello I is a Teacher");
        };
        return Teacher;
    }(Person));
    var data = new Teacher("luck", "mask", new Email("805013834@qq.com"));
    jiprint(data.email.get());
    data.greet();
    data.say();
}
{
    jiprint("进行重新的定义构造函数");
    var Teacher = /** @class */ (function (_super) {
        __extends(Teacher, _super);
        function Teacher(name, surname, email, subobject) {
            var _this = _super.call(this, name, surname, email) || this;
            _this.subobject = subobject;
            return _this;
        }
        Teacher.prototype.oldgeet = function () {
            _super.prototype.greet.call(this);
        };
        Teacher.prototype.greet = function () {
            jiprint("My subobject is " + this.subobject);
        };
        return Teacher;
    }(Person));
    var data = new Teacher("luck", "mask", new Email("805013834@qq.com"), "English");
    jiprint(data.email.get());
    data.greet();
    data.oldgeet();
}
