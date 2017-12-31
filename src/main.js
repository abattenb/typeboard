// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Autocomplete from 'v-autocomplete';

import '@/assets/styles/styles.scss';
import App from './App';
import { logo } from './common/utils';

Vue.use(Autocomplete);

Vue.config.productionTip = false;

// Show logo
logo();

/* eslint-disable no-new */

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
