import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import PageMain from 'page/page-main.vue'
import PageSystems from 'page/page-systems.vue'
import PageConfigurator from 'page/page-configurator.vue'
import PageInstructions from 'page/page-instructions.vue'
import PageContacts from 'page/page-contacts.vue'
import PageForms from 'page/page-forms.vue'
import PageForm3ltp from 'page/forms/page-3ltp.vue'

import macrobranches from 'config/branches.js'


const routes = [

  {
    path: '/',
    redirect: '/north-west/main'
  },

  {
    path: '/:macrobranch/main',
    name: 'main',
    component: PageMain,
    meta: {
      title: 'Главная'
    }
  },

  {
    path: '/:macrobranch/systems/:region?',
    name: 'systems',
    component: PageSystems,
    meta: {
      title: 'Инфосистемы'
    },
    props: true
  },

  {
    path: '/:macrobranch/configurator/:region?',
    name: 'configurator',
    component: PageConfigurator,
    meta: {
      title: 'Конфигуратор'
    },
    props: true
  },

  {
    path: '/:macrobranch/instructions',
    name: 'instructions',
    component: PageInstructions,
    meta: {
      title: 'Инструкции'
    }
  },

  {
    path: '/:macrobranch/contacts',
    name: 'contacts',
    component: PageContacts,
    meta: {
      title: 'Контакты'
    }
  },

  {
    path: '/:macrobranch/forms',
    name: 'forms',
    component: PageForms,
    meta: {
      title: 'Формы'
    }
  },

  {
    path: '/north-west/forms/3ltp',
    component: PageForm3ltp,
    meta: {
      title: 'Оформление выезда'
    }
  },

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.afterEach((to) =>
  nextTick(() =>
      document.title = `SQM Link | ${to.meta.title}`))


export default router
