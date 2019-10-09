"use strict"
var book={
    _year:2004,
    edition:1
};
Object.defineProperty(book,"year",{
    get:function(){
        return this._year;
    },
    set:function(newValue){
        if(newValue>2004){
            this._year=newValue;
            this.edition+=newValue-2004;
        }
    }
});
var data={};
data=Object.getOwnPropertyDescriptor(book,"_year");
console.log(JSON.stringify(data));
book.year=2005;
console.log(book.edition);