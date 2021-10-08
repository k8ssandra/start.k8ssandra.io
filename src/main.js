import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import helpers from './helpers'
import vuetify from './plugins/vuetify'
import VueMeta from 'vue-meta'
import Rollbar from 'rollbar';

Vue.config.productionTip = false

Vue.prototype.$rollbar = new Rollbar({
  accessToken: '548ddb1369d94e178782b452e511d4a8',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

Vue.config.errorHandler = (err, vm) => {
  vm.$rollbar.error(err);
  throw err; // rethrow
};

new Vue({
  router,
  store,
  helpers,
  vuetify,
  VueMeta,
  render: h => h(App)
}).$mount('#app')
