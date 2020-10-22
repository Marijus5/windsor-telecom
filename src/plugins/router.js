import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/task-list",
    name: "Task List",
    meta: { hasSearchBox: true, hasUserFilter: true },
    component: () => import("@/views/TaskList.vue")

  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("@/views/About.vue")
  },
  {
    path: "/",
    redirect: "/task-list"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
