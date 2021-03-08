import Vue from "vue"
import Router from "vue-router"

/* pages */

import HomePage from "../pages/HomePage"

// add global-level functionality to Vue
// call VueRouter.install(Vue)

Vue.use(Router)

var router = new Router({
  // 使用 HTML 5 模式
  // mode: "hash",
  base: __dirname,
  routes: [
    {
      path: "",
      redirect: { name: "home" }
    },
    {
      path: "/home",
      name: "home",
      components: {
        body: HomePage
      }
    }
  ]
})

export default router
