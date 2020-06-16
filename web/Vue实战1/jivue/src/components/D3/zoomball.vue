<template>
  <div>
    <h3>使用D3的动态球</h3>
    <div id="d3"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      theta: Math.PI * (3 - Math.sqrt(5)),
      radius: 6,
      step: this.radius * 2,
      height: 500,
      width: 500,
      currentTransform: [this.width / 2, this.height / 2],
      svg: null,
      g: null,
      info: { length: 2000 },
      data: function() {
        //let length = 2000;
        Array.from(this.info, (_, i) => {
          const r = this.step * Math.sqrt((i += 0.5)),
            a = this.theta * i;
          return [
            this.width / 2 + r * Math.cos(a),
            this.height / 2 + r * Math.sin(a)
          ];
        });
      }
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
          return supper.data[d].x;
        })
        .attr("cy", function(d) {
          return supper.data[d].y;
        })
        .attr("r", function() {
          return supper.radius;
        })
        .attr("fill", function(d, i) {
          return d3.interpolateRainbow(i / 360);
        });
    }
  },
  mounted: function() {
    console.log("hello this is zoom ball");
    this.step1();
    this.step2();
    console.log(this.data[0]);
  }
};
</script>
