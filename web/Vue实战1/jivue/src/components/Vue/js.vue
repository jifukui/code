<template>
  <div>
    <h3>使用外部的JS的文件</h3>
    <div>
      <input type="button" @click="isobj" value="点击我显示"/>
    </div>
  </div>
</template>
<script>
import { isObject } from "../../js/utils.js";
export default {
  data() {
    return {
      value: {
        name: "database",
        age: 56
      }
    };
  },
  methods: {
    isobj: function(){
      let value;
      value=isObject(this.value);
      if(value){
        console.log("纯粹的对象结构");
      } else {
        console.log("非纯粹的数据类型");
      }
    }
  },
  created:function(){
    console.log("have create")
  }
};
</script>
