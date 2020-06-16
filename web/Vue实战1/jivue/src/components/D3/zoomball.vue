<template>
  <div>
    <h3>使用D3的动态球</h3>
    <div id="d3"></div>
    <input type="button" @click="display" value="显示缩放球" />
  </div>
</template>
<script>
import * as d3 from "d3";
let radius = 6;
let theta = Math.PI * (3 - Math.sqrt(5));
let step = radius * 2;
let height = 500;
let width = 500;
let data = Array.from({ length: 2000 }, (_, i) => {
  const r = step * Math.sqrt((i += 0.5));
  const a = theta * i;
  return [width / 2 + r * Math.cos(a), height / 2 + r * Math.sin(a)];
});
let currentTransform = [width / 2, height / 2, height];
export default {
  data() {
    return {
      radius: 6,
      height,
      width,
      currentTransform,
      svg: null,
      g: null,
      data
    };
  },
  methods: {
    step1: function() {
      let supper = this;
      this.svg = d3
        .select("#d3")
        .append("svg")
        .attr("viewBox", [0, 0, supper.width, supper.height]);
    },
    step2: function() {
      let supper = this;
      supper.g = supper.svg.append("g");
      supper.g
        .selectAll("circle")
        .data(supper.data)
        .join("circle")
        .attr("cx", function(d) {
          return d[0];
        })
        .attr("cy", function(d) {
          return d[1];
        })
        .attr("r", function() {
          return supper.radius;
        })
        .attr("fill", function(d, i) {
          return d3.interpolateRainbow(i / 360);
        });
    },
    step3: function() {
      let supper = this;
      let d = this.data[Math.floor(Math.random() * this.data.length)];
      let i = d3.interpolateZoom(supper.currentTransform, [
        ...d,
        radius * 2 + 1
      ]);
      this.g
        .transition()
        .delay(250)
        .duration(i.duration)
        .attrTween("transform", () => t =>
          supper.step4((supper.currentTransform = i(t)))
        )
        .on("end", supper.step3);
    },
    step4: function([x, y, r]) {
      return `
        translate(${this.width / 2}, ${this.height / 2}) 
        scale(${this.height / r}) 
        translate(${-x}, ${-y})  
      `;
    },
    display: function() {
      console.log(this.data[0]);
      this.step1();
      this.step2();
      this.svg.call(this.step3).node();
    }
  },
  mounted: function() {
    console.log("hello this is zoom ball");
  }
};
</script>
