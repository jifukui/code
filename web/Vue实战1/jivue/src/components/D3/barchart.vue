<template>
  <div>
    <h3>这是一个使用D3的柱形图</h3>
    <div id="d3"></div>
    <input type="button" @click="display" value="显示" />
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      dataset: [50, 43, 120, 87, 99, 167, 142],
      width: 400,
      height: 400,
      svg: null,
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      rectsetp: 35,
      rectwidth: 30
    };
  },
  methods: {
    step1: function() {
      let supper = this;
      this.svg = d3
        .select("#d3")
        .append("svg")
        .attr("height", supper.height)
        .attr("width", supper.width);
    },
    step2: function() {
      console.log("the data  is " + this.padding.left);
      let supper = this;
      this.svg
        .selectAll("rect")
        .data(this.dataset)
        .enter()
        .append("rect")
        .attr("file", "steelblue")
        .attr("x", function(d, i) {
          return supper.padding.left + i * supper.rectsetp;
        })
        .attr("y", function(d) {
          return supper.height - supper.padding.bottom - d;
        })
        .attr("width", supper.rectwidth)
        .attr("height", function(d) {
          return d;
        });
    },
    step3: function() {
      let supper = this;
      this.svg
        .selectAll("text")
        .data(supper.dataset)
        .enter()
        .append("text")
        .attr("fill", "white")
        .attr("font-size", "14px")
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return supper.padding.left + i * supper.rectsetp;
        })
        .attr("y", function(d) {
          return supper.height - supper.padding.bottom - d;
        })
        .attr("dx", supper.rectwidth / 2)
        .attr("dy", "1em")
        .text(function(d) {
          return d;
        });
    },
    display: function() {
      this.step1();
      this.step2();
      this.step3();
    }
  }
};
</script>
