var jiprint = console.log;
function applyMixins(derivedCtos, baseCtos) {
    baseCtos.forEach(function (baseCtos) {
        Object.getOwnPropertyNames(baseCtos.prototype).forEach(function (name) {
            if (name !== 'constructor') {
                derivedCtos.prototype[name] = baseCtos.prototype[name];
            }
        });
    });
}
{
    jiprint("不继承animal类");
    var Mammal = /** @class */ (function () {
        function Mammal() {
        }
        Mammal.prototype.breathe = function () {
            return "I'm alive";
        };
        return Mammal;
    }());
    var WingedAnimal = /** @class */ (function () {
        function WingedAnimal() {
        }
        WingedAnimal.prototype.fly = function () {
            return "I can Fly";
        };
        return WingedAnimal;
    }());
    var Bat = /** @class */ (function () {
        function Bat() {
        }
        return Bat;
    }());
    applyMixins(Bat, [Mammal, WingedAnimal]);
    var bat = new Bat();
    jiprint(bat.breathe());
    jiprint(bat.fly());
}
{
    jiprint("继承animal类");
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.eat = function () {
            return "mooncake";
        };
        return Animal;
    }());
    var Mammal = /** @class */ (function () {
        function Mammal() {
        }
        Mammal.prototype.breathe = function () {
            return "I'm alive";
        };
        Mammal.prototype.say = function () {
            return "Mammal";
        };
        return Mammal;
    }());
    var WingedAnimal = /** @class */ (function () {
        function WingedAnimal() {
        }
        WingedAnimal.prototype.fly = function () {
            return "I can Fly";
        };
        WingedAnimal.prototype.say = function () {
            return "WingedAnimal";
        };
        return WingedAnimal;
    }());
    var Bat1 = /** @class */ (function () {
        function Bat1() {
        }
        return Bat1;
    }());
    applyMixins(Bat1, [Mammal, WingedAnimal]);
    var bat = new Bat1();
    //jiprint(bat.eat());
    jiprint(bat.breathe());
    jiprint(bat.fly());
    jiprint(bat.say());
}
