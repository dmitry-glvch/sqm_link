import { createApp } from 'vue'

import app from './component/app.vue'
import router from './router.js'


createApp(app)
    .use(router)
    .mount('#app-mountpoint')
