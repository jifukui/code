<template>
  <div>
    <h3>计算属性的使用</h3>
    <div>
      Get属性的使用：
      <input type="text" v-model="data1" />+
      <input type="text" v-model="data2" />=
      <input type="text" v-bind:value="result" readonly />
    </div>
    <div>
      Set属性的使用：
      <input type="text" v-model="value" debounce="500" lazy />=
      <input type="text" v-bind:value="value1" />+
      <input type="text" v-bind:value="value2" />
    </div>
    <div>
      缓存属性的使用
      <p>{{ time }}</p>
      <input type="button" value="访问属性值" @click="visit" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: 0,
      data2: 0,
      value1: 0,
      value2: 0
    };
  },
  computed: {
    result: function() {
      console.log(Number(this.data1));
      console.log(Number(this.data2));
      if (!isNaN(Number(this.data1)) && !isNaN(Number(this.data2))) {
        return Number(this.data1) + Number(this.data2);
      } else {
        return 0;
      }
    },
    value: {
      set: function(data) {
        console.log(data);
        if (!isNaN(Number(data))) {
          data = Number(data);
          console.log(data);
          this.value1 = data / 10;
          this.value2 = data % 10;
        } else {
          this.value1 = 0;
          this.value2 = 0;
        }
      }
    },
    time: {
      cache: false,
      get: function() {
        return Date.now() + " hello jifukui";
      }
    }
  },
  methods: {
    visit: function() {
      console.log(this.time);
    }
  }
};
</script>
<style scoped>
input[type="text"] {
  width: 30px;
}
</style>
