<template>
  <div class="Container">
    <template v-if="envMode == 'development'">
      <van-button type="primary" @click="handleAa">测试代理</van-button>
      <van-button type="primary" @click="handleLogin">登 录</van-button>
    </template>
    <Launcher />
  </div>
</template>

<script setup lang="ts">
  import Launcher from '../launcher/index.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { login } from '/@/api/index';

  // const router = useRouter();
  const envMode = import.meta.env.MODE;
  const userStore = useUserStore();

  onBeforeMount(() => {});

  onMounted(() => {});

  const handleAa = () => {
    userStore
      .login({
        userName: 'zjw',
        passWord: 'zjw',
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    const data = {
      account: 'frontend@cpapi.com',
      password: 'Password123',
      type: 'PASSWORD',
    };
    login(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>
<style scoped lang="scss"></style>
