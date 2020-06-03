import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);
const myplay = function(store) {
  /**每次调用mutation时都会触发 */
  store.subscribe(function(mutation, state) {
    console.log(mutation.type);
    console.log(state);
  });
};
const jilog =createLogger({
  collapsed: false,
  filter(mutation) {
    //console.log("filter");
    //console.log(stateBefore);
    //console.log(stateAfter);
    console.log(mutation.type);
    //return mutation.type == "jifukui/incream";
  },
  mutationTransformer(mutation) {
    //console.log("mutationTransformer");
    //mutation.type = "jifukui/incream";
    //return mutation.type;
    console.log(mutation.type)
  },
  logger: console
});
const info=[
  {
    path: "/router/info/messi",
    info: "梅西的个人资料",
    name: "里奥梅西",
    age: 32,
    title: "messi"
  },
  {
    path: "/router/info/CR7",
    info: "C罗的个人资料",
    name: "克里斯蒂亚诺罗纳尔多",
    age: 35,
    title: "CR7"
  },
  {
    path: "/router/info/bell",
    info: "贝尔的个人资料",
    name: "加雷斯贝尔",
    age: 30,
    title: "bell"
  },
  {
    path: "/router/info/error",
    info: "无效的个人资料",
    name: null,
    age: null
  }
];
export default new Vuex.Store({
  modules: {
    jifukui: {
      namespaced: true,
      state: {
        count: 100,
        errorinfo: "您打开的网页链接不存在请仔细检查",
        asycount: 100
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
          return state.count > 105;
        }
      }
    },
    play: {
      namespaced: true,
      state: {
        playinfo: info,
        current: info[0]
      },
      mutations: {
        errorinfo: function(state) {
          state.current = state.playinfo[state.playinfo.length - 1];
        },
        findinfo: function(state, name) {
          let i = 0;
          //console.log("the name is " + name);
          for (i; i < state.playinfo.length - 1; i++) {
            let value = state.playinfo[i];
            //console.log("The name is " + value.title)
            if (value.title === name) {
              console.log("设置当前的值");
              state.current = state.playinfo[i];
              console.log("The i is " + i);
              console.log("current " + state.current.name);
              console.log("current " + state.playinfo[i].name);
            }
          }
          this.errorinfo(this.state);
        }
      }
    }
  },
  plugins: [myplay, jilog]
});
