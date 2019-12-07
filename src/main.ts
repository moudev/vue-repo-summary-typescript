import axios from 'axios';
import Vue from 'vue';

import App from './App.vue';
import './assets/scss/_index.scss';

axios.defaults.headers.common.Authorization = `token ${process.env.VUE_APP_GITHUB_KEY}`;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
