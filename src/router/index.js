import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
<<<<<<< HEAD
  }
]

const router = createRouter({
  history: createWebHashHistory(),
=======
  },
  {
    path: '/wizard',
    name: 'Wizard',
    component: () => import('../views/Wizard.vue')
  }
]

const router = new VueRouter({
>>>>>>> 7ee5da0... converted to vue2
  routes
})

export default router
