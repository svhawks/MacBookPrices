import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MacProfile from '@/components/MacProfile'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/macs/:id',
      name: 'mac',
      component: MacProfile
    }
  ],
  mode: 'history'
})
