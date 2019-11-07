const jiprint=console.log;
function applyMixins(derivedCtos:any,baseCtos:any[]) {
    baseCtos.forEach(baseCtos=>{
        Object.getOwnPropertyNames(baseCtos.prototype).forEach(name=>{
            if(name!=='constructor')
            {
                derivedCtos.prototype[name]=baseCtos.prototype[name];
            }
        });
    });
}
{
    jiprint("不继承animal类")
    class Mammal{
        breathe():string{
            return "I'm alive";
        }
    }
    class WingedAnimal{
        fly():string{
            return "I can Fly";
        }
    }
    class Bat implements Mammal,WingedAnimal{
        breathe:()=>string;
        fly:()=>string;
    }
    
    applyMixins(Bat,[Mammal,WingedAnimal]);
    let bat=new Bat();
    jiprint(bat.breathe());
    jiprint(bat.fly());
}
{
    jiprint("继承animal类")
    class Animal{
        eat():string
        {
            return "mooncake";
        }
    }
    class Mammal{
        breathe():string{
            return "I'm alive";
        }
        say():string{
            return "Mammal";
        }
    }
    class WingedAnimal{
        fly():string{
            return "I can Fly";
        }
        say():string{
            return "WingedAnimal";
        }
    }
    class Bat1 implements Mammal,WingedAnimal{
        eat:()=>string;
        breathe:()=>string;
        fly:()=>string;
        say:()=>string;
    }
    applyMixins(Bat1,[Mammal,WingedAnimal]);
    let bat=new Bat1();
    //jiprint(bat.eat());//执行错误
    jiprint(bat.breathe());
    jiprint(bat.fly());
    jiprint(bat.say());
}