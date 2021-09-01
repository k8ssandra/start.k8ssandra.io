<<<<<<< HEAD
import { createApp } from 'vue'
=======
import Vue from 'vue'
>>>>>>> 7ee5da0... converted to vue2
import App from './App.vue'
import router from './router'
import store from './store'

<<<<<<< HEAD
createApp(App).use(store).use(router).mount('#app')
=======
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
>>>>>>> 7ee5da0... converted to vue2
