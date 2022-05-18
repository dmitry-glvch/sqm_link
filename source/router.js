import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import PageMain from 'page/page-main.vue'
import PageSystems from 'page/page-systems.vue'
import PageConfigurator from 'page/page-configurator.vue'
import PageInstructions from 'page/page-instructions.vue'
import PageContacts from 'page/page-contacts.vue'
import PageForms from 'page/page-forms.vue'
import PageForm3ltp from 'page/forms/page-3ltp.vue'


const routes = [

  {
    path: '/',
    redirect: '/north-west/main'
  },

  {
    path: '/:branch/main',
    name: 'main',
    component: PageMain,
    meta: {
      title: 'Главная'
    }
  },

  {
    path: '/:branch/systems/:region?',
    name: 'systems',
    component: PageSystems,
    meta: {
      title: 'Инфосистемы'
    }
  },

  {
    path: '/:branch/configurator/:region?',
    name: 'configurator',
    component: PageConfigurator,
    meta: {
      title: 'Конфигуратор'
    }
  },

  {
    path: '/:branch/instructions',
    name: 'instructions',
    component: PageInstructions,
    meta: {
      title: 'Инструкции'
    }
  },

  {
    path: '/:branch/contacts',
    name: 'contacts',
    component: PageContacts,
    meta: {
      title: 'Контакты'
    }
  },

  {
    path: '/:branch/forms',
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
