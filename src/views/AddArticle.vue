<template>
<HeadBar></HeadBar>
<div class="container">
  <div class="top">
    <h2 class="title">新建博客</h2>
    <div class="btn">
      <el-button @click="saveArticle">保存</el-button>
      <el-button type="primary" @click="publishArticle">发布</el-button>
    </div>
  </div>
  <Editor></Editor>
</div>
</template>

<script lang="ts" setup>
import Editor from '../components/editor/editor.vue';
import { useArticleStore } from '@/store/editArticle';
import HeadBar from '@/components/HeadBar.vue';
import { addArticle, getArticleById } from '@/api/article';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const articleStore = useArticleStore();

// 保存文章
const saveArticle = () => {
  console.log('新增文章的保存');
  console.log(articleStore.formData);
  const formData = {
    ...articleStore.formData,
    label: articleStore.formData.labels.join('、 '), // 将数组转换为字符串
  }
  addArticle(formData, 1)
  ElMessage({
    type: 'success',
    message: '保存成功',
  });
}

// 发布文章
const publishArticle = () => {
  console.log('新增文章的发布');
  console.log(articleStore.formData);
  const formData = {
    ...articleStore.formData,
    label: articleStore.formData.labels.join('、 '), // 将数组转换为字符串
  };
  addArticle(formData, 0)
  ElMessage({
    type: 'success',
    message: '发布成功',
  });
}

</script>

<style scoped>
.container{
  width: 85%;
  margin: 0 auto;

  .top{
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    background-color: #fff;
    padding: 16px 24px;
    margin: 24px 0;
    letter-spacing: 1px;

    .btn{
      display: flex;
      justify-content: flex-end;
    }
  }

  .body{
    width: 100%;
    height: 500px;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px 120px;
  }
}
</style>