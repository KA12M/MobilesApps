import { createRouter, createWebHistory } from "vue-router";
import UserPage from "../views/Users/UserPage.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: UserPage },
    { path: "/user/:id", component: UserPage },
  ],
});
