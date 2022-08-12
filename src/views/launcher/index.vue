<!--
 * @Author: ZhongJunWei
 * @Date: 2022/06/30 14:08
 * @LastEditTime: 2022/07/29 10:04
 * @LastEditors: Janaeiw
 * @FilePath: \wichat\src\views\launcher\index.vue
 * @Description: '启动器'
-->

<template>
  <div class="Container">
    <div v-if="isShowLauncher" class="wi-launcher">
      <van-icon v-if="isOpen" class="wi-close-icon" name="cross" @click="closeChat" />
      <van-icon v-else class="wi-open-icon" name="chat-o" @click="openChat" />
    </div>
    <ChatWindow ref="refChatWindow" :isOpen="isOpen" @closeChat="closeChat" />
  </div>
</template>

<script setup lang="ts">
  import ChatWindow from '../chatWindow/index.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { randomUuid } from '/@/utils/uuid';

  defineProps({
    icons: {
      type: Object,
      default: function () {
        return {
          open: {
            img: null,
            name: 'openIcon',
          },
          close: {
            img: null,
            name: 'closeIcon',
          },
        };
      },
    },
  });

  // 变量
  const userStore = useUserStore(); // 用户pinia
  const isOpen = ref<boolean>(false); // 是否显示聊天窗口
  const isShowLauncher = ref<boolean>(true); // 默认情况下显示启动器
  const refChatWindow = ref<any>(); // 获取聊天窗口的实例

  // 数据部分
  const data = reactive({});

  onBeforeMount(() => {});

  onMounted(() => {
    window.onmessage = function (_event: any) {
      // console.log(_event, '子监听父');
      const { source, data } = _event;
      if (source != window.parent) return;
      const { operate } = data;
      if (operate == 'openChat') {
        isShowLauncher.value = false;
        openChat();
        // 兼容sdk其他环境下的初始化-不删此代码
        // refChatWindow.value.fetchSessionClientBody();
        return false;
      }
    };
    // 默认环境下不自动打开聊天窗口
    // openChat();
  });

  // 关闭客服聊天窗口
  const closeChat = () => {
    isOpen.value = false;
    const data = {
      operate: 'closeChat',
    };
    window.parent.postMessage(data, '*');
  };

  // 开启客服聊天窗口-初始化生成uuid
  const openChat = () => {
    if (userStore.sessionKey) {
      isOpen.value = true;
      refChatWindow.value.scrollToBottom('van-list');
    } else {
      const sessionKey = randomUuid(16, 16);
      userStore.setSessionKey(sessionKey).then((_res) => {
        isOpen.value = true;
      });
    }
  };

  // ref实例传递
  defineExpose({
    ...toRefs(data),
  });
</script>
<style scoped lang="scss">
  .Container {
    .wi-launcher {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      transition: box-shadow 0.2s ease-in-out;
      background-position: 50%;
      background-repeat: no-repeat;
      position: fixed;
      right: 25px;
      bottom: 25px;
      box-shadow: none;
      background: #1989fa;
      cursor: pointer;

      .van-icon {
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        color: #fff;
      }

      .van-icon-chat-o {
        animation: rotate0 100ms;
      }

      .van-icon-cross {
        animation: rotate90 100ms;
      }
    }
  }

  @keyframes rotate0 {
    0% {
      transform: rotate(90deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes rotate90 {
    100% {
      transform: rotate(90deg);
    }
  }
</style>
