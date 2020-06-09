<template>
  <div class="courent">
    <h2>ThreeJS的使用</h2>
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
import jisence from "./sence.vue";
import jimaterial from "./material.vue";
import jianimation from "./animation.vue";
const BasePath = "/three";
const routes = [
  {
    path: BasePath + "sence",
    name: "sence",
    component: jisence,
    info: "这是一个简单的场景"
  },
  {
    path: BasePath + "material",
    name: "material",
    component: jimaterial,
    info: "添加灯光和材质"
  },
  {
    path: BasePath + "animation",
    name: "animation",
    component: jianimation,
    info: "一个简单的动画"
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default {
  router,
  data() {
    return {
      routes
    };
  }
};
</script>
<style scoped>
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
  width: 30%;
  border: 2px solid blue;
  margin: 0px 20px;
}
.right {
  width: 70%;
}
i {
  margin: 6px;
  color: red;
}
</style>
