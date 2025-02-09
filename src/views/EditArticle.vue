<template>
<HeadBar></HeadBar>
<div class="container">
  <div class="top">
    <h2 class="title">编辑博客</h2>
    <div class="btn">
      <el-button @click="saveArticle">保存</el-button>
      <el-button type="primary" @click="publishArticle">发布</el-button>
    </div>
  </div>
  <Editor :id="id"></Editor>
</div>
</template>

<script setup>
import Editor from '@/components/editor/editor.vue';
import HeadBar from '@/components/HeadBar.vue';
import { ref, onMounted } from 'vue';
import { useArticleStore } from '@/store/editArticle';
import { useRoute } from 'vue-router';
import { updateArticleById } from '@/api/article';
import { ElMessage } from 'element-plus';

const articleStore = useArticleStore();

// 保存文章
const saveArticle = () => {
  console.log('更新文章的保存');
  console.log(articleStore.formData);
  const formData = {
    ...articleStore.formData,
    label: articleStore.formData.labels.join('、 '), // 将数组转换为字符串
  }
  updateArticleById(id.value, 1, formData)

  ElMessage({
    type: 'success',
    message: '保存成功',
  });
}

// 发布文章
const publishArticle = () => {
  console.log('更新文章的发布');
  console.log(articleStore.formData);
  const formData = {
    ...articleStore.formData,
    label: articleStore.formData.labels.join('、 '), // 将数组转换为字符串
  }
  updateArticleById(id.value, 0, formData)
  ElMessage({
    type: 'success',
    message: '发布成功',
  });
}

const route = useRoute();

const id = ref(0);

// 根据文章 ID 获取文章内容
onMounted(async () => {
  if(route.query.id){
    id.value = Number(route.query.id);
  }
  // console.log(id.value)
  // try {
  //   const res = await getArticleById(id.value);
  //   article.value = res; // 假设接口返回的数据结构是 { id, title, content }
  //   // 打印文章
  //   console.log(article.value)
  // } catch (err) {
  //   console.error('获取文章详情失败:', err);
  // }
});
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