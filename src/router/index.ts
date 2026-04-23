import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ProductDetailPage from "../pages/ProductDetailPage.vue";
import CartPage from "../pages/CartPage.vue";
import LoginPage from "../pages/Login.vue"; // ✅ must exist in src/pages

const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomePage },
  { path: "/product/:id", name: "product", component: ProductDetailPage, props: true },
  { path: "/cart", name: "cart", component: CartPage },
  { path: "/login", name: "login", component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
