<!--
 * @Author: Janaeiw
 * @Date: 2022/07/12 14:08
 * @LastEditTime: 2022/07/29 10:12
 * @LastEditors: Janaeiw
 * @FilePath: \wichat\src\views\contactInfo\index.vue
 * @Description: '联系资料表格'
-->

<template>
  <div class="Container">
    <p class="wi-header-tip">你好 👋 请填妥表格以开始与客服进行对话。</p>
    <van-form @submit="onSubmit">
      <van-cell-group inset title="基本资料">
        <van-field
          v-model="forms.username"
          name="username"
          label="名称"
          placeholder="名称"
          clearable
          :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
          v-model="forms.email"
          name="email"
          label="电子邮箱"
          placeholder="电子邮箱"
          clearable
          :rules="[
            { required: true, message: '请填写电子邮箱' },
            { required: true, validator: validEmail, message: '请输入正确的电子邮箱' },
          ]"
        />
        <van-field
          v-model="forms.phone"
          type="tel"
          name="phone"
          label="电话号码"
          placeholder="电话号码"
          maxlength="11"
          clearable
          :rules="[{ required: true, message: '请填写电话号码' }]"
        />
      </van-cell-group>

      <div class="wi-footer">
        <van-button icon="guide-o" round block type="primary" native-type="submit"> 开始对话 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '/@/store/modules/user';
  import { validEmail } from '/@/utils/validate';

  const router = useRouter();
  const userStore = useUserStore();

  interface FormsType {
    username?: string;
    email?: string;
    phone?: string;
  }
  const forms = ref<FormsType>({
    username: 'crazy kfc',
    email: 'yum@yum.com.cn',
    phone: '4008823823',
  });

  const onSubmit = (values: any) => {
    const data = { ...values };
    userStore.setInfo({ data }).then((_res: any) => {
      router.replace({
        name: 'Home',
      });
    });
  };
</script>
<style scoped lang="scss">
  .Container {
    background: #f7f8fa;
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: fixed;
    top: 0;
    left: 0;

    .wi-header-tip {
      color: #3c4257;
      font-size: 16px;
      padding: 16px 16px 0 32px;
    }

    .wi-footer {
      margin: 16px;

      ::v-deep .van-button {
        .van-icon {
          font-size: 24px;
        }
      }
    }
  }
</style>
