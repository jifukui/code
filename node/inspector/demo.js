const inspector = require('inspector');
inspector.open(8000,"127.0.0.1",true);
const session  =new inspector.Session();
session.connect();
session.post("Console.enable",(err)=>{
    console.log(`the information is `);
    console.dir(err)
});
console.log(inspector.url())