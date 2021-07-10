import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './index.css'

import PersonaInput from '@/components/PersonaInput.vue'
import PersonaCheckbox from '@/components/PersonaCheckbox.vue'
import PersonaSelect from '@/components/PersonaSelect.vue'

import FrameModal from '@/components/FrameModal.vue';

import PageTitle from '@/components/PageTitle.vue';
import PageTitleBack from '@/components/PageTitleBack.vue';
import ArrowRight from '@/components/ArrowRight.vue'

import UserIcon from '@/components/UserIcon.vue'

const app = createApp(App)
app.use(router)
app.component('PInput', PersonaInput)
app.component('PCheckbox', PersonaCheckbox)
app.component('PSelect', PersonaSelect);
app.component('FrameModal', FrameModal);
app.component('PageTitle', PageTitle);
app.component('PageTitleBack', PageTitleBack);
app.component('ArrowRight', ArrowRight);
app.component('UserIcon', UserIcon);
app.mount('#app');


