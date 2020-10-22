import Vue from "vue";
import axios from "axios";
import App from "@/App.vue";
import router from "@/plugins/router.js";
import vuetify from "@/plugins/vuetify.js";
import store from "@/plugins/store.js";

import "@/components/common";


Vue.config.productionTip = false;

Vue.axios = Vue.prototype.$http = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" })
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
