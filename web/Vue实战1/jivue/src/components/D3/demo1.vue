<template>
  <div>
    <h3>Hello this is simplate D3 demo</h3>
    <div id="d3">Hello this is D3</div>
    <p>Hello my name is jifukui</p>
    <input type="button" @click="display" value="显示" />
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      height: 500,
      coloe: "red"
    };
  },
  methods: {
    display: function() {
      let value = d3.select("p");
      value.style("color", this.coloe);
    }
  },
  beforeCreate: function() {
    console.log("Hello");
  }
};
</script>
