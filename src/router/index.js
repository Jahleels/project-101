import Vue from "vue";
import VueRouter from "vue-router";
import decode from "jwt-decode";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue"),
    // meta: { requiresAuth: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let token = localStorage.getItem("token");
    if (!token) {
      next({ name: "login" });
    } else {
      if (to.matched.some((record) => record.meta.Administrador)) {
        let decodeToken = decode(token);
        if (decodeToken["roll"] === "Administrador") {
          next();
        } else {
          next({ name: "Home" });
        }
      } else {
        next();
      }
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
