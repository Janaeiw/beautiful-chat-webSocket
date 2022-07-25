/*
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 17:33
 * @LastEditTime: 2022/07/01 17:33
 * @LastEditors: ZhongJunWei
 * @FilePath: \wichat-test1\src\api\interface.ts
 * @Description: ''
 */

export interface IResponseType<P = Record<string, unknown>> {
  retcode?: number
  msg?: string
  result?: P
}

// 用户信息
export interface IUserInfo {
  author?: string
  avator?: string
  projectAddress?: string
  demoUrl?: string
  demoCodeUrl?: string
}