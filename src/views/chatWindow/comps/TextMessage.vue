<!--
 * @Author: ZhongJunWei
 * @Date: 2022/07/01 10:17
 * @LastEditTime: 2022/07/25 10:58
 * @LastEditors: Janaeiw
 * @FilePath: \wichat\src\views\chatWindow\comps\TextMessage.vue
 * @Description: '文本消息'
-->

<template>
  <div class="wi-textMessage" :class="{ sender: senderType == 'CUSTOMER' }">
    <p v-html="content"></p>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    content: {
      // 内容
      type: String,
      default: '',
      required: true,
    },
    senderType: {
      // 发送者类型
      // type: String,
      // default: '',
      required: true,
    },
  });
</script>
<style scoped lang="scss">
  .wi-textMessage {
    padding: 8px;
    border-radius: 6px;
    // overflow: hidden;
    background: #fff;
    color: #232323;
    font-size: 14px;
    text-align: left;
    position: relative;
    word-break: break-all;
    display: inline-block;

    &::before {
      content: '';
      width: 0px;
      height: 0px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
      position: absolute;
      top: 8px;
      left: -12px;
      transform: rotate(-90deg);
    }

    &.sender {
      background: #95ec69;

      &::before {
        border-bottom: 10px solid #95ec69;
        left: unset;
        right: -12px;
        transform: rotate(90deg);
      }
    }
  }
</style>
