import { createRouter, createWebHistory } from 'vue-router';
import ShoppingCart from '../views/ShoppingCart.vue';
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import SellerCenter from '../views/SellerCenter.vue'
import ProductDetails from '../views/ProductDetails.vue'
import AddProduct from '../views/AddProduct.vue'

const routes = [
  { path: '/', component: Main, name: 'Main'},
  { path: '/login', component: Login , name: 'Login'},
  { path: '/cart', component: ShoppingCart, name: 'Cart' },
  { path: '/seller-center', component: SellerCenter, name: 'SellerCenter' },
  { path: '/products/new', component: AddProduct, name: 'AddProduct' },
  { path: '/products/:id', component: ProductDetails, name: 'ProductDetails' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
