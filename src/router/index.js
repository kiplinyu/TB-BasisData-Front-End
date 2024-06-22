import { createRouter, createWebHistory } from "vue-router";
import Apoteker from "../components/Apoteker.vue";
import Home from "../components/Home.vue";
import Obat from "../components/Obat.vue";
import Login from "../components/Login.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/apoteker",
    name: "Apoteker",
    component: Apoteker,
  },
  {
    path: "/Obat",
    name: "Obat",
    component: Obat,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
