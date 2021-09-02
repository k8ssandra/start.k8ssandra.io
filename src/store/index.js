import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    k8_config: {
      name: "",
      description: "",
      version: "4.0.0",
      authentication: "true",
    },
  },
  mutations: {
    updateName(state, txt) {
      state.k8_config.name = txt;
    },
    updateDescription(state, txt) {
      state.k8_config.description = txt;
    },
    updateVersion(state, txt) {
      state.k8_config.version = txt;
    },
    updateAuthentication(state, txt) {
      state.k8_config.authentication = txt;
    },
  },
  actions: {},
  modules: {},
});
