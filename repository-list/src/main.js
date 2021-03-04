import Vue from "vue"
import App from "./App.vue"
import router from "./router" // 安裝導頁套件
import axios from "axios" // 引入API套件
const http = axios.create({})
import "./assets/css/style.css"
Vue.prototype.$http = http // 註冊全域變數

new Vue({
  render: h => h(App),
  router
}).$mount("#app")
