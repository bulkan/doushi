import Vue from 'vue'
import VueMq from 'vue-mq'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueMq, {
  breakpoints: {
    xs: 350,
    sm: 650,
    md: 1250,
    lg: Infinity
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
