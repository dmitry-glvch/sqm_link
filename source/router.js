import { createRouter, createWebHistory } from 'vue-router'

import SqmConfigurator from 'page/sqm-configurator.vue'
import SqmInstructions from 'page/sqm-instructions.vue'
import SqmContacts from 'page/sqm-contacts.vue'
import SqmSystems from 'page/sqm-systems.vue'
import SqmForms from 'page/sqm-forms.vue'
import SqmMain from 'page/sqm-main.vue'


const routes = [

  {
    path: '/',
    name: 'Main',
    component: SqmMain
  },

  {
    path: '/systems',
    name: 'Systems',
    component: SqmSystems
  },

  {
    path: '/forms',
    name: 'Forms',
    component: SqmForms
  },

  {
    path: '/configurator',
    name: 'Configurator',
    component: SqmConfigurator
  },

  {
    path: '/instructions',
    name: 'Instructions',
    component: SqmInstructions
  },

  {
    path: '/contacts',
    name: 'Contacts',
    component: SqmContacts
  },

]


export default createRouter({
  history: createWebHistory(),
  routes
})
