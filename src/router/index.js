import { createRouter, createWebHistory } from 'vue-router';
import ShoppingCart from '../views/ShoppingCart.vue';
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

const routes = [
  { path: '/', component: Main, name: 'Main'},
  { path: '/login', component: Login , name: 'Login'},
  { path: '/cart', component: ShoppingCart, name: 'Cart' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
