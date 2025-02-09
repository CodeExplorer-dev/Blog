<template>
<div class="title">
  <h2>博客文章</h2>
  <el-input
      v-model="search"
      style="max-width: 400px; min-height: 40px;"
      placeholder="请输入标题"
      class="search"
    >
      <template #append><el-button :icon="Search" /></template>
  </el-input>
  <el-button type="primary" class="btn" @click="add">新建博客</el-button>
</div>
<div class="category">
  <Category></Category>
</div>

<div class="body">
  <div class="left">
    <Article></Article>
  </div>
  <div class="right">
    <Label></Label>
  </div>
</div>
</template>

<script lang="ts" setup>
import Category from '@/components/category/category.vue';
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';
import Label from '@/components/label/label.vue';
import Article from '@/components/article/article.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const add = () => {
  router.push('/addarticle')
}
const search = ref('');
</script>

<style scoped>
h2{
  font-size: 24px;
  font-weight: 500;
  padding-left: 10px;
  position: absolute;
  width: 100%;
  /* height: 24px; */
  /* background-color: pink; */
  top: 90px;
}

.search{
  position: absolute;
  right: 220px;
  top: 90px;
}

.btn{
  position: absolute;
  right: 110px;
  top: 94px;
}
.category{
  position: absolute;
  top: 160px;
  width: 80%;
  /* background-color: skyblue; */
}

.body{
  display: flex;
  position: absolute;
  top: 250px;
  width: 80%;
  /* height: 20px;
  background-color: skyblue; */

  .left{
    width: 73%;
    /* background-color: #ddd; */
  }

  .right{
    width: 25%;
    margin-left: 27px;
  }
}
</style>