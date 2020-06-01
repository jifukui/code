<template>
  <div id="app">
    <nav>
      <router-link to="/index">首页信息</router-link>
      <router-link tp="/about">关于我们的信息</router-link>
      <router-view></router-view>
    </nav>
    
  </div>
</template>

<script>
//import todo from "./components/Todolist.vue"
import index from "./view/index.vue"
import about from "./view/about"
export default {
  name: 'App',
  data(){
    return {
      name:"jfiukui",
      todolist:[
        {
          id:1,
          text:"香蕉"
        },
        {
          id:2,
          text:"苹果"
        },
        {
          id:3,
          text:"西瓜"
        }
      ]
    }
  },
  components: {
    //HelloWorld
    //todo
    //index,
    //about
  },
  methods:{
    haveclick:function(target){
      console.log(target.target);
    },
    jiclick:function(val){
      console.log(val);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
