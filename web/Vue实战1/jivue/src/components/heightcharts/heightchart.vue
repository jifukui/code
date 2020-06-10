<template>
  <div class="courent">
    <h2>Heightchart的使用</h2>
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
import jidemo from "./demo1.vue";
const BasePath = "/heightchart";
const routes = [
  {
    path: BasePath + "/demo1",
    name: "demo1",
    component: jidemo,
    info: "一个简单的heightchart样例"
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
