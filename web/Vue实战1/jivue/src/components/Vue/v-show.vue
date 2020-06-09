<template>
  <div @click="listenning">
    <h3>v-show的使用</h3>
    <p v-show="show">当前显示的是v-show的内容</p>
    <input type="button" v-bind:value="buttoninfo" @click.stop="change" />
  </div>
</template>
<script>
const info = ["隐藏信息", "显示信息"];
export default {
  data() {
    return {
      info,
      show: this.$store.state.jivue.vif
    };
  },
  computed: {
    buttoninfo: function() {
      return this.info[Number(!this.show)];
    }
  },
  methods: {
    change: function() {
      this.show = !this.show;
    },
    listenning: function(e) {
      console.log(e);
    }
  }
};
</script>
<style>

</style>
