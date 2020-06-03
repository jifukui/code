import Vue from "vue";
import VueRouter from "vue-router";
import jivuex from "../views/Vuex.vue";
import errorinfo from "../views/errorinfo.vue";
import index from "../views/index.vue";
import jifukui from "../views/jifukui.vue";
import route from "../views/router.vue";
import info from "../components/player/info.vue";
import playerinfo from "../components/player/playerinfo.vue";
Vue.use(VueRouter);
/*function Getinfo() {
  let value = [];
  Vue.$store.state.play.playinfo.map(function(item) {
    let data = {};
    data.path = item.path;
    data.name = item.name;
    data.component = messi;
    value.push(data);
  });
}*/
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
        children: [
          {
            path: "*",
            name: "playerinfo",
            component: playerinfo
          }
        ]
      }
    ]
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
    name: "errorinfo",
    component: errorinfo
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
