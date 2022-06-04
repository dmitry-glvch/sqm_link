import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import PageMain from 'page/page-main.vue'
import PageSystems from 'page/page-systems.vue'
import PageConfigurator from 'page/page-configurator.vue'
import PageInstructions from 'page/page-instructions.vue'
import PageContacts from 'page/page-contacts.vue'
import PageForms from 'page/page-forms.vue'
import SqmForm from 'component/form/sqm-form.vue'

import config from 'source/config.js'


const routes = [

  {
    path: '/',
    redirect: config.defaultRoute
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
    path: '/:branch/forms/:form',
    name: 'form',
    component: SqmForm,
    meta: {
      title: 'Формы'
    }
  }

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.afterEach((to) =>
  nextTick(() =>
      document.title = `SQM Link | ${to.meta.title}`))


export default router
