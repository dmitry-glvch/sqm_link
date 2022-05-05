import { createRouter, createWebHistory } from 'vue-router'

import SqmConfigurator from 'component/sqm-configurator.vue'
import SqmSystems from 'component/sqm-systems.vue'


const routes = [

  {
    path: '/configurator',
    name: 'Home',
    component: SqmConfigurator
  },

  {
    path: '/systems',
    name: 'Systems',
    component: SqmSystems
  }

]


export default createRouter({
  history: createWebHistory(),
  routes
})
