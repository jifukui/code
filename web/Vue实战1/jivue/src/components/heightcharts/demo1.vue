<template>
  <div>
    <h3>一个简单的heightchart的使用</h3>
    <div id="demo"></div>
    <input type="button" v-bind:value="value" @click="display" />
  </div>
</template>
<script>
import heighchart from "highcharts";
const title = {
  text: "浏览器<br>占比",
  align: "center",
  verticalAlign: "middle",
  y: 50
};
const tooltip = {
  headFormat: "{series.name}<br>",
  pointFormat: "{point.name}:<b>{point.percentage:.1f}%</b>"
};
const plotOptions = {
  pie: {
    dataLables: {
      enabled: true,
      distance: -50,
      style: {
        fontWeight: "bold",
        color: "white",
        textShadow: "0px 1px 2px black"
      },
      startAngle: -90,
      endAngle: 90,
      center: ["50%", "70%"]
    }
  }
};
const series = [
  {
    type: "pie",
    name: "浏览器占比",
    innerSize: "50%",
    data: [
      ["firefox", 45.0],
      ["IE", 26.8],
      ["Chrome", 12.8],
      ["Safari", 8.5],
      ["Opera", 6.2],
      {
        name: "其他",
        y: 0.7,
        dataLables: {
          enabled: false
        }
      }
    ]
  }
];

export default {
  data() {
    return {
      value: "显示信息",
      json: {
        title,
        tooltip,
        plotOptions,
        series
      }
    };
  },
  methods: {
    display: function() {
      console.log(this.json);
      heighchart.chart("demo", this.json);
    }
  }
};
</script>
