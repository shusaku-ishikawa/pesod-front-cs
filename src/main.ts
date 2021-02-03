import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './index.css'

import PersonaInput from '@/components/PersonaInput.vue'
import PersonaCheckbox from '@/components/PersonaCheckbox.vue'

import BaseLayout from '@/layouts/Base.vue';
import TopLayout from '@/layouts/Top.vue';
import FrameModal from '@/components/FrameModal.vue';

const app = createApp(App)
app.use(router)
app.component('PInput', PersonaInput)
app.component('PCheckbox', PersonaCheckbox)

app.component('BaseLayout', BaseLayout)
app.component('TopLayout', TopLayout)
app.component('FrameModal', FrameModal);
app.mount('#app')
