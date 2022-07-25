const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('/@/layout/basic/index.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: '聊天画面',
          keepAlive: true,
        },
      },
      {
        path: '/contactInfo',
        name: 'ContactInfo',
        component: () => import('/@/views/contactInfo/index.vue'),
        meta: {
          title: '联系资料表格',
          keepAlive: true,
        },
      },
    ],
  },
];

export default routes;
