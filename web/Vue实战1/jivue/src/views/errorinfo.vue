<template>
  <div>
    <h1>您打开了一个错误的网页</h1>
    <span v-text="info"></span>
  </div>
</template>
<script>
export default {
  name: "errorinfo",
  data() {
    return {
      info: this.$store.state.jifukui.errorinfo
    };
  }
};
</script>
