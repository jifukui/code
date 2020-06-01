import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    errorinfo: "您打开的网页链接不存在请仔细检查"
  },
  mutations: {
    incream:function(state){
      console.log(state.count);
      //console.log(state.getters.countend);
      state.count++;
    }
  },
  actions: {},
  modules: {},
  getters:{
    countend:function(state) {
      return state.count > 5;
    }
  }
});
