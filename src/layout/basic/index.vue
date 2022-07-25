<template>
  <div class="main-page">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.main-page {
  background: transparent;
  // height: calc(100vh);
  // overflow-y: scroll;
  // overflow-x: hidden;
}
</style>
