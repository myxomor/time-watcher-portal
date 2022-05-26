import Vue from 'vue'
import Router from 'vue-router'
import ProjectsTasks from './views/ProjectsTasks.vue'
import Works from './views/Works'

Vue.use(Router)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      name: 'projects',
      component: ProjectsTasks
    },
    {
      path: '/works',
      name: 'works',
      component: Works
    }
  ],
  base: '/dashboard/'
})

export default router
