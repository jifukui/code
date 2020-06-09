<template>
  <div>
    <h3>v-text的使用</h3>
    <div>
      <h4>{{ vtextinfo }}</h4>
      <p v-text="vtexttitle"></p>
      <p v-text="value1 + value2"></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vtextinfo: this.$store.state.jivue.vtextinfo,
      vtexttitle: this.$store.state.jivue.vtexttitle,
      value1: 8,
      value2: 10
    };
  }
};
</script>
