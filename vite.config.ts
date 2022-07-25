import { createVitePlugins } from './config/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';
import { createProxy } from './config/vite/proxy'

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ command }: ConfigEnv): UserConfigExport {

  const isProduction = command === 'build';
  const root = process.cwd();
  return {
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      // port: 9088, // 端口
      host: true,
      hmr: true,
      proxy: createProxy()
    },
    plugins: createVitePlugins(isProduction),
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 全局 scss 变量
        },
      },
    },
  };
}
