console.log(typeof ji)
let ji
var a = {
    name: "jifukui",
    like: "football"
}
Object.freeze(a);
console.dir(a);
a.name = "jjjjj";
console.dir(a)
var b = {
    name: "jifukui",
    like: "football",
    job: {
        name: "software"
    }
}
Object.freeze(b);
console.dir(b);
b.job.name = "jjjjj";
console.dir(b)