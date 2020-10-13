import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueSocketIO from "vue-socket.io";
Vue.config.productionTip = false;
Vue.use(ElementUI);
//console.log("the ip is " + window.location.href);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: window.location.href,
    vuex: {
      store,
      mutationPrefix: "JI_",
      actionPrefix: "JIA_"
    },
    options: ""
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
