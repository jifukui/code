<template>
  <div>
    <h3>V-model的使用</h3>
    <input type="checkbox" v-model="checked" v-bind:value="value" />
    <p>复选框的选中状态为:{{ checked }}</p>
    <input type="radio" v-model="radioed" name="sex" value="男" />男
    <input type="radio" v-model="radioed" name="sex" value="女" />女
    <p>单选框选择的性别为:{{ radioed }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "点击我",
      checked: this.$store.state.jivue.vif,
      radioed: "男"
    };
  }
};
</script>
