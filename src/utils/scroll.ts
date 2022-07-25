/*
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 14:40
 * @LastEditTime: 2022/07/01 14:58
 * @LastEditors: ZhongJunWei
 * @FilePath: \wichat-test1\src\utils\scroll.ts
 * @Description: '操作滚动条'
 */

import { nextTick } from 'vue';

/**
 * @description: 滚动条保持最底部
 * @param {any} calssName
 * @return {*}
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 14:46
 */
export function scrollToBottom(calssName: any): any {
  nextTick(() => {
    let container = document.querySelector<any>(`.${calssName}`);
    container.scrollTop = container.scrollHeight;
  })
}