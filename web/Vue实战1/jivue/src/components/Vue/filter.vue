<template>
  <div>
    <h3>过滤器的使用</h3>
    <div>
      <label>首字母转换为大写形式</label>
      <p>{{ info | capitalize }}</p>
      <label>全体字母的大写</label>
      <p>{{ info | UpperCase }}</p>
      <label>全体字母的小写</label>
      <p>{{ info | lowerCase }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: "hello my name is JIFUKUI"
    };
  },
  filters: {
    capitalize: function(value) {
      console.log("The value is " + value);
      return value[0].toUpperCase() + value.slice(1, value.length);
    },
    UpperCase: function(value) {
      return value.toUpperCase();
    },
    lowerCase: function(value) {
      return value.toLowerCase();
    }
  },
  created:function(){
    console.log("filter have create");
  }
};
</script>
