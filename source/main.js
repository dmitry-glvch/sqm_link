import { createApp } from 'vue'

import Page from './component/page.vue'
import router from './router.js'


createApp(Page)
    .use(router)
    .mount('#app-mountpoint')
