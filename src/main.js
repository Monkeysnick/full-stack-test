// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* active Vue.js */
import Vue from 'vue'

/* Call framwork - vuetify */
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
Vue.use(Vuetify)

/* VueLodash*/
// import VueLodash from 'vue-lodash'
// Vue.use(VueLodash)

import App from './App'

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
