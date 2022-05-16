import { nextTick } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  [ '/main',         'Главная',              () => import('page/page-main.vue') ],
  [ '/systems',      'Инфосистемы',          () => import('page/page-systems.vue') ],
  [ '/configurator/:region', 'Конфигуратор', () => import('page/page-configurator.vue') ],
  [ '/instructions', 'Инструкции',           () => import('page/page-instructions.vue') ],
  [ '/contacts',     'Контакты',             () => import('page/page-contacts.vue') ],
  [ '/forms',        'Формы',                () => import('page/page-forms.vue') ],
  [ '/forms/3ltp',   'Оформление выезда',    () => import('page/forms/page-3ltp.vue') ]
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    ...routes.map(([ path, title, component ]) => ({
      path,
      component,
      meta: {
        title
      }
    })),
    { path: '/', redirect: '/main' },
    { path: '/index', redirect: '/main' },
    { path: '/configurator', redirect: '/configurator/spb' }
  ]
})

router.afterEach((to) => {
  nextTick(() => {
    document.title = `SQM Link | ${to.meta.title}`
  })
})


export default router
