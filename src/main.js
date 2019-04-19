/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PouchDB from 'pouchdb'
import TablerVue from '../dist/vue-tabler'

Vue.use(TablerVue)


Vue.use(require('vue-pouch'), {
  pouch: PouchDB,    // optional if `PouchDB` is available on the global object
  defaultDB: 'mac_scores',  // this is used as a default connect/disconnect database
  optionDB: {}, // this is used to include a custom fetch() method (see TypeScript example)
  debug: '*' // optional - See `https://pouchdb.com/api.html#debug_mode` for valid settings (will be a separate Plugin in PouchDB 7.0)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
