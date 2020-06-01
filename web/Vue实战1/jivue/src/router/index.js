import Vue from "vue";
import VueRouter from "vue-router";
import jivuex from "../views/Vuex.vue";
import errorinfo from "../views/errorinfo.vue";
import index from "../views/index.vue";
import jifukui from "../views/jifukui.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "vuex",
    component: jivuex
  },
  {
    path: "/jifukui",
    name: "jifukui",
    component: jifukui
  },
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "*",
    name: "error",
    component: errorinfo
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
