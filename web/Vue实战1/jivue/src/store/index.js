import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    errorinfo: "您打开的网页链接不存在请仔细检查",
    asycount: 0
  },
  mutations: {
    incream: function(state) {
      console.log(state.count);
      state.count++;
    },
    incream1: function(state) {
      console.log(state.count);
      state.asycount++;
    },
    message1: function(state) {
      console.log("message1 " + state.count);
    },
    message2: function(state) {
      console.log("message2 " + state.count);
    }
  },
  actions: {
    increamasy: function(state) {
      console.log("have be called");
      setTimeout(function() {
        state.commit("incream1");
      }, 1000);
    }
  },
  modules: {},
  getters: {
    countend: function(state) {
      return state.count > 5;
    }
  }
});
