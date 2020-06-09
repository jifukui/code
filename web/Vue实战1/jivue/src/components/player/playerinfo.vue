<template>
  <div>
    <h1>运动员个人信息表</h1>
    <div>
      <label>姓名</label><input type="text" v-bind:value="value.name" />
    </div>
    <div><label>年龄</label><input type="text" v-bind:value="value.age" /></div>
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
    value: function() {
      return this.$store.state.play.current;
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
