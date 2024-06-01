<template>
  <div class="layout-footer pb15">
    <div class="layout-footer-warp">
      <div class="mt5">    
        <span style="color: var(--el-text-color-primary--el-color-info-dark-2);">@風嶼Link「正在不断进化中...」| </span>
        <span style="color: var(--el-text-color-primary--el-color-info-dark-2);"> build:2024/6/2</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="layoutFooter">

// 此处需有内容（注释也得），否则缓存将失败
</script>

<style scoped lang="scss">
.layout-footer {
  width: 100%;
  display: flex;

  &-warp {
    margin: auto;
    color: var(--el-text-color-secondary);
    text-align: center;
    animation: error-num 0.3s ease;
  }
}
</style>
