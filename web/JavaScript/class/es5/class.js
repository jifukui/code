function Liguo() {
	this.model="VS-811H2A",
	this.VideoInputCounts=8,
	this.VideoOutputCounts=1,
    this.jifukui=true
    //this.show=true
}
let liguo = new Liguo();
Object.defineProperty(Liguo,"show",{
    get:function(){
        console.log("I have called")
        return this.jifukui;
    },
    set:function(value){
        this.jifukui=!!value;
    }
})
console.log(liguo.show);
liguo.show=0;
console.log(liguo.show)
