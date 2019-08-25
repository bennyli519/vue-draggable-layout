/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-08-25 11:12:55
 * @LastEditTime: 2019-08-25 11:58:22
 */
import Vue from 'vue'
import Router from 'vue-router'

import Container from '../components/Container.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container
    },
  ]
})