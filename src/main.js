import Vue from 'vue';
import App from './App.vue';
import store from './store';
import Crystal from '@/components/Crystal.vue';
import ScoreBar from '@/components/ScoreBar.vue';

Vue.config.productionTip = false;

Vue.component('crystal', Crystal);
Vue.component('score-bar', ScoreBar);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
