import { createVitePlugins } from './config/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import { wrapperEnv } from './config/utils';
import { createProxy } from './config/vite/proxy';
import { createBuild } from './config/vite/build';


const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfigExport {

  const isProduction = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root); // 加载env环境
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PUBLIC_PATH } = viteEnv;

  return {
    root,
    base: VITE_PUBLIC_PATH,
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
      proxy: createProxy(viteEnv),
    },
    plugins: createVitePlugins(isProduction),
    build: <any>createBuild(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  };
}
