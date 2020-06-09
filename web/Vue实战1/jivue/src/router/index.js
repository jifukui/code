import Vue from "vue";
import VueRouter from "vue-router";
import jivuex from "../views/Vuex.vue";
import errorinfo from "../views/errorinfo.vue";
import index from "../views/index.vue";
import jifukui from "../views/jifukui.vue";
import route from "../views/router.vue";
import info from "../components/player/info.vue";
import jivue from "../components/Vue/vue.vue";
import ji_elemnetui from "../components/elementui/elementui.vue";
import ji_threejs from "../components/three/three.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "vuex",
    component: jivuex
  },
  {
    path: "/router/",
    name: "route",
    component: route,
    children: [
      {
        path: "info",
        name: "info",
        component: info,
        params: { userid: 123 },
        query: { userid: 123 }
      }
    ]
  },
  {
    path: "/vue",
    name: "vue",
    component: jivue,
    alias: "jifukuivue"
  },
  {
    path: "/elementui",
    name: "elementui",
    component: ji_elemnetui
  },
  {
    path: "/three",
    name: "three",
    component: ji_threejs
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
    redirect: {
      name: "route"
    }
  },
  {
    path: "/index",
    name: "errorinfo",
    component: errorinfo
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(function(to, from, next) {
  console.log("to is " + to);
  console.log("from is " + from);
  next();
});
export default router;
