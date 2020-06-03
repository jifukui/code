<template>
  <div>
    <div>
      <router-link
        v-for="item in info"
        v-bind:to="item.path"
        v-text="item.info"
        v-bind:key="item.path"
      ></router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
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
