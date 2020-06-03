<template>
  <div>
    <h1>运动员个人信息表</h1>
    <label>姓名</label><input type="text" v-bind:value="name" />
  </div>
</template>

<script>
//import { createNamespacedHelpers } from "vuex";
//const { mapMutations } = createNamespacedHelpers("play");
export default {
  name: "player",
  watch: {
    $route: function(to, form) {
      console.log(to, form);
      let info1 = to.path.split("/");
      let info2 = form.path.split("/");
      let i;
      for (i = 0; i < 3; i++) {
        if (info1[i] !== info2[i]) {
          break;
        }
      }
      if (i === 3) {
        this.findinfo(info1[3]);
      }
    }
  },
  computed: {
    name: function() {
      return this.$store.state.play.current.name;
    }
  },
  methods: {
    findinfo: function(name) {
      console.log("The name is " + name);
      this.$store.commit("play/findinfo", name);
    }
  },
  created: function() {
    console.log("have create");
  },
  destroyed: function() {
    console.log("Have destory");
  }
};
</script>
<style>
input [type="text"] {
  display: table;
}
</style>
