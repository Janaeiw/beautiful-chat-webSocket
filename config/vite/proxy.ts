export function createProxy() {
  return {
    // 选项写法
    '/webapi': {
      // target: 'https://testnew.wisight.cn/webapi',
      target: 'http://192.168.3.121:9999',
      changeOrigin: true,
      configure: (proxy: any, _options: any) => {
        proxy.on('proxyReq', function (_proxyReq: any, _req: any, _res: any, _options: any) {
        });
      },
      rewrite: (path: any) => path.replace(/^\/webapi/, '')
    },
  }
}