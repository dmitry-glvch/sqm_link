import { createApp } from 'vue'

import page from './component/page.vue'
import router from './router.js'


createApp(page)
    .use(router)
    .mount('#app-mountpoint')
