import { createRouter, createWebHistory } from "vue-router";
import MainLoan from "../views/MainLoan.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main-loan",
      component: MainLoan,
    },
    {
      path: "/positive-decision",
      name: "positive",
      component: () => import("../views/PositiveDecision.vue"),
    },
    {
      path: "/negative-decision",
      name: "negative",
      component: () => import("../views/NegativeDecision.vue"),
    },
  ],
});

export default router;
