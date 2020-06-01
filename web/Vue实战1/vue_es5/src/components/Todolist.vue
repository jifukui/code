<template>
    <li v-on:click="todoclick">{{ data}}</li>
</template>
<script>
export default {
    props:["data"],
    data(){
        return {
            name:"jifukui"
        }
    },
    beforeCreate:function(){
        console.log("Hello have beforecreate "+name);
    },
    created:function(){
        console.log("Hello have create "+this.data);
    },
    beforeMount:function(){
        console.log("Hello have beforemount "+ this.data);
    },
    mounted:function(){
        console.log("Hello have mounted "+name +" "+this.name);
    },
    beforeUpdate:function(){
        console.log("hello have beforeUpdate");
    },
    updated:function(){
        console.log("hello have updated");
    },
    beforeDestroy:function(){
        console.log("hello have beforedestoty");
    },
    destroyed:function(){
        console.log("hello have destroy");
    },
    methods:{
        todoclick:function(e){
            console.log(this.data)
            console.log(e);
            this.$emit("todoclick",e.target.innerHTML);
        }
    }
}
</script>


<style scoped>
    li{
        color: blue;
    }
</style>