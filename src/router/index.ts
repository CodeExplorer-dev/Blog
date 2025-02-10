import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
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
  const token = localStorage.getItem('token');
  const loginTime = localStorage.getItem('loginTime');
  const isLoggedIn = !!token;
  const isLoggingOut = localStorage.getItem('loggedOut') === 'true';
  const tokenExpirationTime = 36000000; // 假设 token 有效期为 1 小时

  if (isLoggingOut) {
    // 如果用户已经退出登录，重定向到登录页面
    localStorage.removeItem('loggedOut');
    next('/login');
  } else if (isLoggedIn && loginTime) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - parseInt(loginTime);

    if (elapsedTime > tokenExpirationTime) {
      // 如果 token 已过期，清除 token 和登录时间，并重定向到登录页面
      localStorage.removeItem('token');
      localStorage.removeItem('loginTime');
      next('/login');
    } else if (to.path === '/login') {
      // 如果用户已登录且尝试访问登录页面，重定向到首页
      next('/');
    } else {
      next();
    }
  } else if (!isLoggedIn && to.path !== '/login') {
    // 如果用户未登录且尝试访问非登录页面，重定向到登录页面
    next('/login');
  } else {
    next();
  }
});

export default router
