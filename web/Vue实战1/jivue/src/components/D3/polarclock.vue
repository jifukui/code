<template>
  <div>
    <h3>Hello this is polar clock</h3>
    <div id="d3"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
let height = 594;
let width = height;
let radius = width / 1.67;
let armRadius = radius / 22;
//let dotRadius = armRadius - 9;
let fields = [
  {
    radius: 0.2 * radius,
    interval: d3.timeYear,
    subinterval: d3.timeMonth,
    format: d3.timeFormat("%b")
  },
  {
    radius: 0.3 * radius,
    interval: d3.timeMonth,
    subinterval: d3.timeDay,
    format: d3.timeFormat("%d")
  },
  {
    radius: 0.4 * radius,
    interval: d3.timeWeek,
    subinterval: d3.timeDay,
    format: d3.timeFormat("%a")
  },
  {
    radius: 0.6 * radius,
    interval: d3.timeDay,
    subinterval: d3.timeHour,
    format: d3.timeFormat("%H")
  },
  {
    radius: 0.7 * radius,
    interval: d3.timeHour,
    subinterval: d3.timeMinute,
    format: d3.timeFormat("%M")
  },
  {
    radius: 0.8 * radius,
    interval: d3.timeMinute,
    subinterval: d3.timeSecond,
    format: d3.timeFormat("%S")
  }
];
export default {
  data() {
    return {
      height,
      width,
      fields,
      svg: null,
      field: null,
      fieldTick: null,
      fieldFocus: null,
      fieldCircle: null
    };
  },
  methods: {
    step1: function() {
      //初始化对象窗口
      this.svg = d3.select("#d3");
      this.svg
        .attr("viewBox", [0, 0, width, height])
        .attr("text-anchor", "middle")
        .style("display", "block")
        .style("font", "700 14px 'Helvetica Neue'");
      /*
      this.fieldCircle = this.fieldTick
        .append("circle")
        .attr("r", dotRadius)
        .attr("fill", "white")
        .style("color", (d, i) =>
          this.color((i / d.field.range.length) * 2 * Math.PI)
        )
        .style("transition", "fill 750ms ease-out");
      this.fieldTick
        .append("text")
        .attr("dy", "0.35em")
        .attr("fill", "#222")
        .text(d => d.field.format(d.time).slice(0, 2));
      this.fieldFocus = this.field
        .append("circle")
        .attr("r", dotRadius)
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 3)
        .attr("cy", d => -d.radius)
        .style("transition", "transform 500ms ease");
      /*yield this.update(Math.floor((Date.now() + 1) / 1000) * 1000);
      while ( true ) {
        const then = Math.ceil((Date.now() + 1) / 1000) * 1000;
        //yield Promises.when(then, then).then(update);
      }*/
    },
    step2: function() {
      //在svg中添加g标签的数据的初始化
      this.field = this.svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .selectAll("g")
        .data(fields)
        .enter()
        .append("g");
    },
    setp3: function() {
      //绘制
      this.field
        .append("circle")
        .attr("file", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .attr("r", d => d.radius);
    },
    step4: function() {
      //初始化事件域的参数
      this.fieldTick = this.field
        .selectAll("g")
        .data(d => {
          const date = d.interval(new Date(2000, 0, 1));
          d.range = d.subinterval.range(date, d.interval.offset(date, 1));
          return d.range.map(t => ({ time: t, field: d }));
        })
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
          const angle = (i / d.field.range.length) * 2 * Math.PI - Math.PI / 2;
          return `translate(${Math.cos(angle) * d.field.radius},${Math.sin(
            angle
          ) * d.field.radius})`;
        });
      //填充时间域的内容
      this.fieldTick
        .append("text")
        .attr("dy", "0.35em")
        .attr("fill", "#222")
        .text(d => d.field.format(d.time).slice(0, 2));
    },
    update: function(then) {
      for (const d of fields) {
        const start = d.interval(then);
        const index = d.subinterval.count(start, then);
        d.cycle = (d.cycle || 0) + (index < d.index);
        d.index = index;
      }
      this.fieldCircle.attr("fill", (d, i) =>
        i === d.field.index ? "currentColor" : "white"
      );
      this.fieldFocus.attr(
        "transform",
        d => `rotate(${(d.index / d.range.length + d.cycle) * 360})`
      );
      return this.svg.node();
    },
    arcArm: function() {
      return d3
        .arc()
        .startAngle(d => armRadius / d.radius)
        .endAngle(d => -Math.PI - armRadius / d.radius)
        .innerRadius(d => d.radius - armRadius)
        .outerRadius(d => d.radius + armRadius)
        .cornerRadius(armRadius);
    },
    color: function() {
      return d3.scaleSequential(d3.interpolateRainbow).domain([0, 2 * Math.PI]);
    }
  },
  mounted: function() {
    this.step1();
    this.step2();
    this.step3();
  }
};
</script>
