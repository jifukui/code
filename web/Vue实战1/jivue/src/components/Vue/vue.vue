<template>
  <div class="courent">
    <h2>Vue 的使用</h2>
    <span v-text="title"></span>
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
import ji_vtext from "./v-text.vue";
import ji_vif from "./v-if.vue";
import ji_vshow from "./v-show.vue";
import ji_vmodel from "./v-model.vue";
import ji_computer from "./computer.vue";
import ji_filter from "./filter.vue";
import ji_style from "./style.vue";
import ji_transform from "./transform.vue";
import ji_js from "./js.vue";
import ji_css from "./css.vue";
const basePath = "/vue/";
const routes = [
  {
    path: basePath + "v-text",
    name: "v-text",
    component: ji_vtext,
    info: "v-text指令的使用"
  },
  {
    path: basePath + "v-if",
    name: "v-if",
    component: ji_vif,
    info: "v-if指令的使用"
  },
  {
    path: basePath + "v-show",
    name: "v-show",
    component: ji_vshow,
    info: "v-show指令的使用"
  },
  {
    path: basePath + "v-model",
    name: "v-model",
    component: ji_vmodel,
    info: "v-modle指令的使用"
  },
  {
    path: basePath + "computer",
    name: "computer",
    component: ji_computer,
    info: "计算属性的使用"
  },
  {
    path: basePath + "filter",
    name: "filter",
    component: ji_filter,
    info: "过滤器的使用"
  },
  {
    path: basePath + "style",
    name: "style",
    component: ji_style,
    info: "样式和CSS类的使用"
  },
  {
    path: basePath + "transform",
    name: "transform",
    component: ji_transform,
    info: "过渡属性的使用"
  },
  {
    path: basePath + "js",
    name: "js",
    component: ji_js,
    info: "使用外部的js文件"
  },
  {
    path: basePath + "css",
    name: "css",
    component: ji_css,
    info: "使用外部的css文件"
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
      title: this.$store.state.jivue.info,
      routes
    };
  },
  methods: {
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
}
.left {
  width: 30%;
  border: 2px solid blue;
  margin: 0px 20px;
}
.right {
  width: 65%;
}
</style>
