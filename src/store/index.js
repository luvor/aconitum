import Vue from "vue";
import Vuex from "vuex";
import { data } from "../mock";

Vue.use(Vuex);

function deleteProp(obj, props) {
  console.log(props);
  console.log("проплен", props.length);
  const prop = props.shift();
  if (!obj["Подразделения"][prop]) {
    console.log("преахтунг");
    console.log(obj);
    console.log(prop);
    console.log("АХТУНГ");
    return;
  }
  if (!props.length) {
    console.log("DELETE", prop);
    Vue.delete(obj, prop);
    return;
  }
  deleteProp(obj[prop], props["Подразделения"]);
}

export default new Vuex.Store({
  state: {
    data: {},
  },
  getters: {
    allData(state) {
      return state.data;
    },
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    loadData(state) {
      state.data = data;
    },
    addKey(state, payload) {
      const { name, level, entry } = payload;
      if (level === "0") {
        console.log("ASDOJUWH");
        Vue.set(state.data, name, entry);
      } else {
        state.data[level.split(",").map((item) => item.trim())][
          "Подразделения"
        ] = entry;
      }
      console.log("vuex", state.data);
    },
    deleteKey(state, propsArray) {
      if (propsArray.length === 1) {
        Vue.delete(state.data, propsArray[0]);
        return;
      }
      deleteProp(state.data, propsArray);
    },
  },
  actions: {
    fetchData(context) {
      context.commit("loadData");
    },
  },
  modules: {},
});
