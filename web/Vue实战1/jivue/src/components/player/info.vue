<template>
  <div>
    <div>
      <router-link
        v-for="item in info"
        v-bind:to="item.path"
        v-text="item.info"
        v-bind:key="item.path"
        v-bind:params="item.path"
        v-bind:query="item.path"
        v-bind:props="{ name: 'jifukui', sex: 'famle' }"
      ></router-link>
      <router-link to="{name:'playinfo',params:{userid:123 }}">
        错误的页面</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import VueRouter from "vue-router";
import playerinfo from "./playerinfo.vue";
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      name: "playinfo",
      component: playerinfo
    }
  ]
});
export default {
  router,
  name: "info",
  data() {
    return {
      info: this.getinfo()
    };
  },
  methods: {
    getinfo: function() {
      let data = this.$store.state.play.playinfo.slice(
        0,
        this.$store.state.play.playinfo.length - 1
      );
      console.log("data is " + this.$store.state.play.playinfo.length);
      return data;
    }
  }
};
</script>
<style>
a {
  display: table;
}
</style>
