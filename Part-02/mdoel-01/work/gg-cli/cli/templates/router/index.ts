import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/forbidden",
    name: "forbidden",
    meta: {
      auth: true
    },
    component: () => import("@/views/403.vue")
  },
  {
    path: "/notfound",
    name: "notfound",
    meta: {
      auth: true
    },
    component: () => import("@/views/404.vue")
  }
];

const createRouter: any = () =>
  new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });

const router = createRouter();

router.beforeEach((to: any, from: any, next: any) => {
  next();
});

export default router;
