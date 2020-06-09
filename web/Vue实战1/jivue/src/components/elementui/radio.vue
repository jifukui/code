<template>
  <div>
    <h3>radio的使用</h3>
    <div>
      <el-radio-group v-model="radio1" @change="radiochange">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio1: "北京"
    };
  },
  methods: {
    radiochange: function() {
      console.log("The value is  " + this.radio1);
    }
  }
};
</script>
<style>

</style>
