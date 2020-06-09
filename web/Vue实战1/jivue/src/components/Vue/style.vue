<template>
  <div>
    <h3>样式相关的修改设置</h3>
    <div v-bind:class="[sty1, sty2, sty3]">
      第一个div块的样式相关,使用数组的方法
    </div>
    <div v-bind:class="{ sty_1: true, sty_2: true, sty_3: jistyle }">
      第二个div块的样式相关，使用对象的方法
    </div>
    <div v-bind:style="{ backgroundColor: color1, fontSize: font1 }">
      第三个div块的内联样式的对象方法
    </div>
    <div v-bind:style="[stya1, stya2]">
      第四个div块的内联样式的对象方法
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sty1: "sty_1",
      sty2: "sty_2",
      sty3: "sty_3",
      jistyle: false,
      color1: "blue",
      font1: "18px",
      stya1: { backgroundColor: "yellow" },
      stya2: { borderWidth: "2px", borderColor: "red", borderStyle: "dashed" }
    };
  }
};
</script>
<style scoped >
@import "../../css/main.css";
.sty_1 {
  background-color: brown;
}
.sty_2 {
  width: 500px;
  height: 20px;
}
.sty_3 {
  border: 2px solid red;
}
</style>
