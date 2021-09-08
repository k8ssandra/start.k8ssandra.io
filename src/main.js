import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from './helpers'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  helpers,
  render: h => h(App)
}).$mount('#app')
