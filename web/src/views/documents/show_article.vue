<template>
<div>
  <el-scrollbar style="height:100%;">
  <div style="font-size: 50px;text-align: center">{{articleStoreData.currentArticle.value.title}}</div>
  <div style="color: #9b9da1;text-align: center">{{articleStoreData.currentArticle.value.introduction}}</div>
  <v-md-preview :text="articleStoreData.currentArticle.value.content"></v-md-preview>
  </el-scrollbar>
</div>
</template>

<script setup lang="ts">
import {useArticleStore} from "/@/stores/user_logic/articleStore";
import {storeToRefs} from "pinia";

const articleStore = useArticleStore()
const articleStoreData = storeToRefs(articleStore)


</script>

<style scoped>
.el-scrollbar__wrap {
  overflow-x: hidden;
  }
</style>