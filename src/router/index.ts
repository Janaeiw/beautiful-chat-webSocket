import { createRouter, createWebHashHistory, Router } from 'vue-router';
// import { useUserStore } from '/@/store/modules/user';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHashHistory('/'),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {

  const { title } = _to.meta
  document.title = title;

  // 兼容sdk其他环境下的初始化-不删此代码
  // const userStore = useUserStore();
  // 判断pinia是否有用户信息
  // if (!_to.path.includes('contactInfo') && JSON.stringify(userStore.getUserInfo) == '{}') {
  //   next({
  //     name: 'ContactInfo',
  //     replace: true,
  //   });
  //   return false;
  // }

  next();
});

export default router;
