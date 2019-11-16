import Vue from 'vue'
import VueRouter from 'vue-router'
import FrontPage from '../views/FrontPage'
import SinglePost from '../views/SinglePost'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FrontPage
  },
  {
    path: '/:id',
    name: 'Post',
    component: SinglePost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
