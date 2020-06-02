<template>
  <div class="courent">
    <div v-text="count"></div>
    <input type="button" v-bind:value="buttoninfo" @click="incream" />
    <div v-text="countlimit"></div>
    <div v-text="count1"></div>
    <div v-text="countlimit1"></div>
    <input type="button" v-bind:value="buttoninfo" @click="message1" />
    <input type="button" v-bind:value="buttoninfo" @click="message2" />
    <input type="button" v-bind:value="buttoninfo" @click="add" />
    <div v-text="asyncnum"></div>
    <input type="button" v-bind:value="buttoninfo" @click="async1" />
    <input type="button" v-bind:value="buttoninfo" @click="async2" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "vuex",
  data() {
    return {
      count: this.$store.state.count,
      buttoninfo: "点击我",
      value: 0,
      countlimit: false
    };
  },
  methods: {
    incream: function() {
      this.$store.commit("incream");
      this.count = this.$store.state.count;
      console.log("counted is " + this.$store.getters.countend);
      this.countlimit = this.$store.getters.countend;
    },
    ...mapMutations(["message1", "message2"]),
    ...mapMutations({
      add: "message1"
    }),
    async1: function() {
      this.$store.dispatch("increamasy");
    },
    ...mapActions({
      async2: "increamasy"
    })
  },
  computed: {
    ...mapState({
      count1: function(state) {
        return state.count;
      },
      asyncnum: function(state) {
        return state.asycount;
      }
    }),
    countlimit1: function() {
      console.log(this.$store.getters.countend);
      return this.$store.getters.countend;
    }
  }
};
</script>

<style scoped></style>
