<template>
  <div>
    <h3>这里使用外部的CSS样式进行渲染</h3>
    <div>{{ value }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "这里部分是用来进行局部渲染的"
    };
  }
};
</script>
<style scoped>

</style>
