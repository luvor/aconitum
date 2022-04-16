import Vue from "vue";
import Vuex from "vuex";
import { revolutuinaryData } from "../mock";
import { deleteProp, setProp } from "./nestedObjectMethods";

Vue.use(Vuex);

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
      state.data = revolutuinaryData;
    },
    setKey(state, payload) {
      setProp(
        state.data,
        payload.level.split(",").map((v) => v.trim()),
        payload.entry
      );
    },
    addKey(state, payload) {
      let { name, level, entry } = payload;
      // console.log(name, level, entry);

      if (entry) {
        if (level === "0") {
          Vue.set(state.data, name, entry);
        } else {
          level += "," + name;
          setProp(
            state.data,
            level.split(",").map((v) => v.trim()),
            entry
          );
        }
      } else {
        if (level === "0") {
          Vue.set(state.data, name, {});
        } else {
          level += "," + name;
          setProp(
            state.data,
            level.split(",").map((v) => v.trim()),
            {}
          );
        }
      }
    },
    deleteKey(state, propsString) {
      const propsArray = propsString.split(",").map((v) => v.trim());
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
