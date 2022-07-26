<!--
 * @Author: ZhongJunWei
 * @Date: 2022/06/30 18:10
 * @LastEditTime: 2022/07/26 16:13
 * @LastEditors: Janaeiw
 * @FilePath: \beautiful-chat-webSocket\src\views\chatWindow\index.vue
 * @Description: '聊天窗口'
-->

<template>
  <!-- 上滑进入 -->
  <transition name="van-fade">
    <div class="wi-chat-window" v-if="isOpen">
      <div class="wi-header">
        <div class="wi-user">
          <van-image fit="cover" :src="avatarHref" />
          <div class="wi-info">
            <span class="name">{{ sessionUserInfo?.senderName || 'BOT' }}</span>
            <span class="describe">帅哥一个</span>
          </div>
        </div>
        <div class="wi-close-icon">
          <van-icon name="cross" @click="closeChat" />
        </div>
      </div>

      <div class="wi-body">
        <van-list v-model:loading="loading" :finished="finished" @load="fetchSessionClientBody">
          <template v-if="messageList.length >= 10">
            <div class="loadMore">
              <template v-if="headFinished">
                <p>没有更多了</p>
              </template>

              <template v-else-if="loadMore">
                <van-loading size="24px">加载中...</van-loading>
              </template>

              <template v-else>
                <p @click="handleLoadMore">加载更多</p>
              </template>
            </div>
          </template>

          <div
            class="wi-messages-wrap"
            :class="{ sender: item.senderType == 'CUSTOMER' }"
            v-for="(item, index) in messageList"
            :key="index"
          >
            <van-image class="avatar-wrap" fit="cover" :src="item.avatar" />

            <div class="message-wrap">
              <template v-if="item.content.type == 'Text'">
                <TextMessage :content="item.content.content" :senderType="item.senderType" />
              </template>

              <p class="createTime" :class="{ sender: item.senderType == 'CUSTOMER' }">
                {{ dayjs(item.ctime).format('YYYY-MM-DD HH:mm') }}</p
              >
            </div>
          </div>
        </van-list>
      </div>

      <div class="wi-footer">
        <van-form>
          <van-field
            type="textarea"
            v-model="forms.content"
            name="message"
            placeholder="输入点什么"
            maxlength="200"
            rows="1"
            :autosize="{ maxHeight: 100 }"
            @keydown="handleKeyDown($event)"
          />
        </van-form>
        <div class="wi-user-input-button">
          <!-- <template v-if="!forms.content">
            <van-uploader :after-read="afterRead">
              <van-icon name="link-o" />
            </van-uploader>
          </template>
          <template v-else>
            <van-icon name="guide-o" @click="handleSendContent" />
          </template> -->
          <van-icon name="guide-o" @click="handleSendContent" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
  import { Notify, Toast } from 'vant';
  import { scrollToBottom } from '/@/utils/scroll';
  import { replaceSpace, validateAllSpace } from '/@/utils/validate';
  import { useUserStore } from '/@/store/modules/user';
  import { useCookies } from '@vueuse/integrations/useCookies';
  import dayjs from 'dayjs';
  import TextMessage from './comps/TextMessage.vue';

  defineProps({
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
  });

  // 事件传递
  const $emit = defineEmits(['closeChat']);

  // 变量
  const userStore = useUserStore(); // 用户pinia
  const clientWS =
    import.meta.env.MODE == 'development' ? 'ws://192.168.3.109:9999/wichat/ws/customer' : 'wss://shop.wiln.cn/wichat/ws/customer'; // 客户聊天页面
  const avatarHref = 'https://joeschmoe.io/api/v1/random'; // 外部头像链接

  const sessionClientWS = ref<any>(null); // 会话客户
  const sessionClientLockReconnect = ref<any>(false);
  const sessionUserInfo = ref<any>(null); // 会话用户信息
  const loading = ref(false); // 会话列表加载
  const finished = ref(false); // 会话列表-加载完成
  const loadMore = ref(false); // 加载更多会话消息
  const headFinished = ref(false); // 更多会话消息-加载完成

  type messageType = {
    id?: Number;
    senderType?: String; // 发送者类型,可用值:USER,CUSTOMER
    avatar?: string; // 头像
    content: {
      content?: string; // 文本内容
      type?: string; // 消息类型,可用值:Article,Picture,Video,Text,Moment_Material,Poster,Product,QrCode,LINK_CARD,Link,UNKNOWN
    }; // 内容
    ctime?: Date | string; // 发送信息时间戳
  }[];
  const messageList = ref<messageType>([]); // 会话消息列表

  type formsType = {
    content: string;
  };
  const forms = ref<formsType>({
    content: '',
  });

  // 数据部分
  const data = reactive({});

  // 组件挂载页面之前执行 - onBeforeMount
  onBeforeMount(() => {});

  // 组件挂载到页面之后执行 - onMounted
  onMounted(() => {});

  // 关闭客服会话聊天窗口,注:不主动关闭WS
  const closeChat = () => {
    $emit('closeChat');
  };

  // webSocket心跳机制-防止自动断开连接
  const heartCheck = {
    timeout: <any>60000, // 60秒
    timeoutObj: <any>null,
    reset: function () {
      clearInterval(this.timeoutObj);
      return this;
    },
    start: function (webSocket: any) {
      this.timeoutObj = setInterval(function () {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        // onmessage拿到返回的心跳就说明连接正常
        webSocket.send('HeartBeat');
      }, this.timeout);
    },
  };

  // 连接webSocket获取客户主体
  const fetchSessionClientBody = () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const uuid = userStore.getUserUuid || useCookies().get('uuid');
    const url = `${clientWS}?session_key=${uuid}`;
    const webSocket = new WebSocket(url);
    if (!sessionClientWS.value) {
      sessionClientWS.value = webSocket;
    }
    webSocket.onopen = () => {
      console.log('连接上 webSocket 服务端了 - wichatOnLoad');
      heartCheck.reset().start(webSocket);
    };
    webSocket.onerror = (_error) => {
      if (sessionClientLockReconnect) {
        return;
      }
      // 没连接上会一直重连，设置延迟避免请求过多
      let timer = setTimeout(function () {
        fetchSessionClientBody();
        sessionClientLockReconnect.value = false;
        clearTimeout(timer);
      }, 4000);
    };
    webSocket.onclose = (event) => {
      console.log('wichatOnLoad - webSocket 断开: ' + event.code + ' ' + event.reason + ' ' + event.wasClean);
    };
    webSocket.onmessage = (event) => {
      sessionClientLockReconnect.value = true;
      // event 为服务端传输的消息，在这里可以处理
      // console.log(event, 'onmessage');
      const { data } = event;
      const parseData = JSON.parse(data);
      // 获取会话用户信息
      if (!sessionUserInfo.value) {
        sessionUserInfo.value = parseData?.messageList?.find((item: any) => item.senderType == 'USER');
      }
      // 拼接会话消息列表
      let newMessageList = <any>[];
      switch (parseData.position) {
        case 'HEAD': // 加载更多记录-unshift
          if (parseData?.messageList.length > 0) {
            newMessageList = parseData?.messageList
              ?.map((item: any, _index: any) => ({
                ...item,
                avatar: avatarHref,
              }))
              .concat([...messageList.value]);
            messageList.value = [...newMessageList];
          } else {
            headFinished.value = true;
          }
          loadMore.value = false;
          break;
        case 'TAIL': // 当前最新记录-push
          newMessageList = [...messageList.value].concat(
            parseData?.messageList?.map((item: any, _index: any) => ({
              ...item,
              avatar: avatarHref,
            })),
          );
          messageList.value = [...newMessageList];
          // 接收最新会话内容滚动到最底部
          scrollToBottom('van-list');
          break;
      }
    };
    loading.value = false;
    finished.value = true;
    Toast.clear();
    // 兼容sdk其他环境下的初始化-不删此代码
    // if (finished.value) {
    //   return false;
    // }
  };

  // 点击发送内容
  const handleSendContent = () => {
    const { content } = forms.value;
    if (content.length <= 0 || validateAllSpace(content)) {
      Notify({ type: 'warning', message: '不能发送空白信息' });
      // 空白内容主动清空文本域
      forms.value.content = '';
      return false;
    }
    const data = {
      secretFlag: false,
      content: {
        content: replaceSpace(content),
        type: 'Text',
      },
      action: 'SEND',
    };
    sessionClientWS.value.send(JSON.stringify(data));
    // 发送成功清空文本域
    forms.value.content = '';
  };

  // 监听键盘enter事件,shift+enter换行
  const handleKeyDown = (event: any) => {
    if (!event.shiftKey && event.keyCode == 13) {
      event.cancelBubble = true; // ie阻止冒泡行为
      event.stopPropagation(); // Firefox阻止冒泡行为
      event.preventDefault(); // 取消事件的默认动作*换行
      //以下处理发送消息代码
      const { content } = forms.value;
      if (content.length <= 0 || validateAllSpace(content)) {
        Notify({ type: 'warning', message: '不能发送空白信息' });
        // 空白内容主动清空文本域
        forms.value.content = '';
        return false;
      }
      const data = {
        secretFlag: false,
        content: {
          content: replaceSpace(content),
          type: 'Text',
        },
        action: 'SEND',
      };
      sessionClientWS.value.send(JSON.stringify(data));
      // 发送成功清空文本域
      forms.value.content = '';
    }
  };

  // 加载更多会话消息
  const handleLoadMore = () => {
    loadMore.value = true;
    const data = {
      lastMsgId: messageList.value[0].id, // 取会话内容的第一条
      limit: 10,
      action: 'PAGE',
    };
    sessionClientWS.value.send(JSON.stringify(data));
  };

  // 上传文件-未完成
  // const afterRead = (file: any) => {
  //   // 此时可以自行将文件上传至服务器
  //   console.log(file);
  // };

  // 监听自定义dom滚动到底部
  const backBottom = () => {
    scrollToBottom('van-list');
  };

  watchEffect(() => {});

  // ref实例传递
  defineExpose({
    ...toRefs(data),
    fetchSessionClientBody,
    backBottom,
  });
</script>
<style scoped lang="scss">
  .wi-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: fixed;
    right: 0;
    bottom: 0;
    border-radius: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    z-index: 999;

    .wi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      flex-shrink: 0;
      z-index: 99;
      box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
      background: #ffffff;

      .wi-user {
        display: flex;
        align-items: center;

        .van-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 12px;
        }

        .wi-info {
          display: flex;
          flex-direction: column;

          .name {
            font-size: 16px;
            color: #1b1c1f;
          }

          .describe {
            font-size: 12px;
            color: #3c4858;
            margin-top: 4px;
          }
        }
      }

      .wi-close-icon {
        font-size: 24px;

        .van-icon {
          cursor: pointer;
        }
      }
    }

    .wi-body {
      display: flex;
      flex: 1 1 0%;
      overflow: auto;
      background: #f5f5f5;

      .van-list {
        width: 100%;
        overflow-y: scroll;
        padding: 20px 10px;

        .loadMore {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #e06b1e;
          text-align: center;
          justify-content: center;
          margin-bottom: 10px;
          p {
            cursor: pointer;
          }
        }

        .wi-messages-wrap {
          display: flex;
          margin-bottom: 10px;

          .avatar-wrap {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
          }

          .message-wrap {
            // flex: 1;
            max-width: 80%;
          }
          .createTime {
            color: #a5a5a5;
            font-size: 14px;
            margin-top: 6px;
            &.sender {
              text-align: right;
            }
          }

          &.sender {
            flex-direction: row-reverse;

            .avatar-wrap {
              margin: 0;
              margin-left: 20px;
            }
            .message-wrap {
              text-align: right;
            }
          }
        }

        &::-webkit-scrollbar {
          width: 7px;
          height: 8px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #9093994d;
          border-radius: 4px;
          box-shadow: inset 0 0 6px #0003;
        }
        &::-webkit-scrollbar-track {
          background-color: #0000000d;
        }
      }
    }

    .wi-footer {
      padding: 20px;
      box-shadow: 0px 7px 40px 2px rgb(148 149 150 / 30%);
      display: flex;
      align-items: center;

      .van-form {
        flex: 1 1 0%;

        .van-field {
          font-size: 18px;
          padding: 0;
          padding-right: 10px;
        }
      }

      .wi-user-input-button {
        font-size: 24px;
        font-weight: bold;

        .van-icon {
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 450px) {
    // .wi-chat-window {
    // width: 420px !important;
    // height: 500px !important;
    // right: 25px !important;
    // bottom: 100px !important;
    // border-radius: 16px !important;
    // overflow: hidden !important;
    // }
  }
</style>
