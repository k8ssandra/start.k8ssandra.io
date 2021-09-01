import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    k8_config: {
      id: 'ID',
      name: 'Name'
    },
    text: 'Bind Text example'
  },
  mutations: {
    INCREMENT_COUNT(state) {
      state.count += 1
    },
    updateText (state, txt) {
      state.text = txt
    }
  },
  actions: {
  },
  modules: {
  }
})
