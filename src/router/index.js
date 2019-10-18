import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Lobby from '../views/Lobby.vue'
import Scores from '../views/Scores.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/gameplay/:id',
    name: 'gameplay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "gameplay" */ '../views/Gameplay.vue')
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: Room,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('name') && localStorage.getItem('id')) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/rooms/:id',
    name: 'roomlobby',
    component: Lobby
  },
  {
    path: '/scores',
    name: 'scores',
    component: Scores
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
