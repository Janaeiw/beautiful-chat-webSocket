/*
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 15:04
 * @LastEditTime: 2022/07/14 14:46
 * @LastEditors: Janaeiw
 * @FilePath: \wichat\src\utils\validate.ts
 * @Description: '正则表达式'
 */

/**
 * @description: 替换空格-\n-><br/>
 * @param {String} text
 * @return {String}
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 15:05
 */
export function replaceSpace(text: string): any {
  return text.replace(/\n/g, "<br/>")
}

/**
 * @description: 验证文本是否全是空格
 * @param {string} text
 * @return {Boolean}
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 15:09
 */
export function validateAllSpace(text: string): any {
  if (text.split(" ").join("").length == 0) {
    return true
  }
  return false
}

/**
 * @description: 邮箱
 * @param {*} value
 * @return {*}
 * @Author: Janaeiw
 * @Date: 2022/07/14 14:45
 */
export function validEmail(value:string):any {
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  return reg.test(value)
}