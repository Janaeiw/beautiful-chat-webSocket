/*
 * @Author: Janaeiw
 * @Date: 2022/07/12 14:56
 * @LastEditTime: 2022/07/25 09:36
 * @LastEditors: Janaeiw
 * @FilePath: \wichat\src\utils\storage.ts
 * @Description: '本地缓存'
 */

export function localGetItem(key: string) {
  return localStorage.getItem(key)
}

export function localSetItem(key: string, value: string) {
  return localStorage.setItem(key, value)
}

export function localRemoveItem(key: string) {
  localStorage.removeItem(key)
}