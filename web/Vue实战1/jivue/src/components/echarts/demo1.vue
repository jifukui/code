<template>
  <div>
    <h3>一个简单的echart的使用</h3>
    <div id="demo" style="width:400px;height:300px"></div>
    <input type="button" v-bind:value="value" @click="display" />
  </div>
</template>
<script>
import echarts from "echarts";
const tooltip = {
  trigger: "item",
  formatter: "{a} <br/>{b}: {c} ({d}%)"
};
const legend = {
  orient: "vertical",
  left: 10,
  data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
};
const series = [
  {
    name: "访问来源",
    type: "pie",
    radius: ["50%", "70%"],
    avoidLabelOverlap: false,
    label: {
      show: false,
      position: "center"
    },
    emphasis: {
      label: {
        show: true,
        fontSize: "30",
        fontWeight: "bold"
      }
    },
    labelLine: {
      show: false
    },
    data: [
      { value: 335, name: "直接访问" },
      { value: 310, name: "邮件营销" },
      { value: 234, name: "联盟广告" },
      { value: 135, name: "视频广告" },
      { value: 1548, name: "搜索引擎" }
    ]
  }
];
export default {
  data() {
    return {
      value: "显示信息",
      json: {
        legend,
        tooltip,
        series
      }
    };
  },
  methods: {
    display: function() {
      console.log(this.json);
      let mychart = echarts.init(document.getElementById("demo"));
      //console.log(mychart);
      let status = mychart.setOption(this.json);
      console.log(status);
    }
  },
  mounted: function() {
    this.display();
  }
};
</script>
