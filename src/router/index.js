import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Fournisseurs from '../components/Fournisseurs'
import Recharges from '../components/Recharges'
import Ventes from '../components/Ventes'
import Utilisateur from '../components/Utilisateur'
import Stock from '../components/Stock'

// import Header from '../components/Header.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/Fournisseurs',
    name: 'Fournisseurs',
    component: Fournisseurs
  },
  {
    path: '/Ventes',
    name: 'Ventes',
    component: Ventes
  },
  {
    path: '/Recharges',
    name: 'Recharges',
    component: Recharges
  },
  {
    path: '/Utilisateur',
    name: 'Utilisateur',
    component: Utilisateur
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
