import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
    // k8_config: {
    //   id: 'yes yeys',
    //   name: 'tester11'
    // }
  },
  mutations: {
    INCREMENT_COUNT(state) {
      state.count += 1
    }
  },
  actions: {
  },
  modules: {
  }
})
