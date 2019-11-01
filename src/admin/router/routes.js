export default [
  {
    path: "/login",
    component: () => import("../components/pages/login.vue"),
    meta: {
      public: true
    }
  },
  {
    path: "/",
    component: () => import("../components/pages/about.vue"),
    meta: {
      title: "Block 'About me'"
    }
  },
  {
    path: "/works",
    component: () => import("../components/pages/works.vue"),
    meta: {
      title: "Block 'My Works'"
    }
  },
  {
    path: "/feedback",
    component: () => import("../components/pages/feedback.vue"),
    meta: {
      title: "Block 'Feedback'"
    }
  }
];