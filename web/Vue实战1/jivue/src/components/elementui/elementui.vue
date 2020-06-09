<template>
  <div class="courent">
    <h2>这一部分开始使用elementUI进行开发</h2>
    <div class="main">
      <div class="left">
        <router-link
          v-for="item in routes"
          v-bind:key="item.path"
          v-bind:to="item.path"
          v-text="item.info"
        >
        </router-link>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

import VueRouter from "vue-router";
import eleButton from "./button.vue";


const BasePath="/elementui"
const routes=[
  {
    path: BasePath +"/button",
    name:"button",
    component: eleButton,
    info: "学习使用ElementUI中的按钮控件"    
  }
]
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
export default {
  router,
  data() {
    return {
      routes
    }
  }
}
</script>
<style  scoped>
a {
  display: table;
  margin: 0.2rem;
  text-decoration-line: none;
  color: black;
}
.main {
  display: flex;
  width: 100%;
}
.left {
  width: 40%;
  border: 2px solid blue;
  margin: 0px 20px;
}
.right {
  width: 60%;
}
</style>