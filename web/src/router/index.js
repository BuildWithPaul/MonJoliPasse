import { createWebHistory, createRouter } from "vue-router";
import Main from "@/Main.vue";
import BrowserNotCompatible from "@/BrowserNotCompatible.vue";

const routes = [
  {
    path: "/web",
    name: "Home",
    component: Main,
  },
  {
    path: "/web/navigateur-incompatible",
    name: "BrowserNotCompatible",
    component: BrowserNotCompatible,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
