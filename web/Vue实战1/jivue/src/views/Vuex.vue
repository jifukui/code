<template>
  <div class="courent">
    <h2>同步数据的更新</h2>
    <div v-text="count"></div>
    <input type="button" v-bind:value="buttoninfo" @click="incream" />
    <div v-text="countlimit"></div>
    <div v-text="count1"></div>
    <div v-text="countlimit1"></div>
    <input type="button" v-bind:value="buttoninfo" @click="message1" />
    <input type="button" v-bind:value="buttoninfo" @click="message2" />
    <input type="button" v-bind:value="buttoninfo" @click="add" />
    <h2>异步数据的更新</h2>
    <div v-text="asyncnum"></div>
    <input type="button" v-bind:value="buttoninfo" @click="async1" />
    <input type="button" v-bind:value="buttoninfo" @click="async2" />
    <h3>完成这部分CSS的渲染</h3>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "jifukui"
);
export default {
  name: "vuex",
  data() {
    return {
      count: this.$store.state.jifukui.count,
      buttoninfo: "点击我",
      value: 0,
      countlimit: false
    };
  },
  methods: {
    incream: function() {
      this.$store.commit("jifukui/incream");
      this.count = this.$store.state.jifukui.count;
      console.log("counted is " + this.$store.getters["jifukui/countend"]);
      this.countlimit = this.$store.getters["jifukui/countend"];
    },
    ...mapMutations(["message1", "message2"]),
    ...mapMutations({
      add: "message1"
    }),
    async1: function() {
      this.$store.dispatch("jifukui/increamasy");
    },
    ...mapActions({
      async2: "increamasy"
    })
  },
  computed: {
    ...mapState({
      count1: function(state) {
        return state.count || 1;
      },
      asyncnum: function(state) {
        return state.asycount || 1;
      }
    }),
    countlimit1: function() {
      console.log(this.$store.getters["jifukui/countend"]);
      return this.$store.getters["jifukui/countend"];
    }
  }
};
</script>

<style scoped></style>
