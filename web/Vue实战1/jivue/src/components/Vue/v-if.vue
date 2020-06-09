<template>
  <div>
    <h3>v-if的使用</h3>
    <p v-if="show">这里将会显示if中的内容</p>
    <input type="button" @click="changeif" v-bind:value="buttoninfo"/>
  </div>
</template>
<script>
const info = ["隐藏信息", "显示信息"];
export default {
  data() {
    return {
      show: this.$store.state.jivue.vif,
      info: info
    };
  },
  methods: {
    changeif: function() {
      this.show = !this.show;
    }
  },
  computed: {
    buttoninfo: function() {
      return this.info[Number(!this.show)];
    }
  }
};
</script>
<style>
input [type="button"] {
  width: 30px;
  background-color: brown;
  box-shadow: cyan;
}
</style>
