import Vue from 'vue'
import Router from 'vue-router'
import ProjectsTasks from "./views/ProjectsTasks.vue";

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'projects',
      component: ProjectsTasks
    }
  ]
})


export default router
