/**
 * @name ConfigStyleImport
 * @description 按需加载，自动引入组件库样式
 * https://github.com/anncwb/vite-plugin-style-import
 */

import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import';

type libsType = {
  libraryName?: string;
  libraryNameChangeCase?: string;
  esModule?: Boolean;
  resolveStyle?: Function;
}[];

export const ConfigStyleImport = (_isBuild: any) => {
  const libs: libsType = [
    {
      libraryName: 'vant',
      esModule: true,
      resolveStyle: (name: any) => {
        return `../es/${name}/style/index`;
      },
    },
  ];
  return createStyleImportPlugin({
    resolves: [VantResolve()],
    libs: <any>[...libs],
  });
};
