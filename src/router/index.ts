import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
      name: 'home',
      component: IndexView,
      children: [
        {
          path: "home",
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('../views/ArtilceView.vue'),
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('../views/SettingView.vue'),
        },
        {
          path: '/diary',
          name: 'diary',
          component: () => import('../views/DiaryView.vue'),
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('../views/MyView.vue')
        }
      ]
    },
    {
      path: '/addarticle',
      name: 'addarticle',
      component: () => import('../views/AddArticle.vue'),
    },
    {
      path: '/editarticle',
      name: 'editarticle',
      component: () => import('../views/EditArticle.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token'); // 假设使用 token 来判断是否登录
  const isLoggingOut = localStorage.getItem('loggedOut') === 'true';

  if (isLoggingOut) {
    // 如果用户已经退出登录，重定向到登录页面
    localStorage.removeItem('loggedOut');
    next('/login');
  } else if (!isLoggedIn && to.path !== '/login') {
    // 如果用户未登录且尝试访问非登录页面，重定向到登录页面
    next('/login');
  } else {
    next();
  }
});

export default router
