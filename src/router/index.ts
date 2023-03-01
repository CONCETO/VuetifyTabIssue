import { useUrlTabStore } from "@/stores/tab-store";
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DetailView.vue')
    }
  ]
})

router.beforeResolve((to) => {
  const urlTabStore = useUrlTabStore();
  if (to.name === "detail" && to.params.id) {
    urlTabStore.addOrderTab(Number(to.params.id));
  } else {
    urlTabStore.changePersistentTab({
      url: String(to.name),
      title: String(to.name),
      id: Number(to.params.id),
    });
  }
});

export default router
