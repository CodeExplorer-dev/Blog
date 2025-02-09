<template>
  <div class="title">
    <h2>测试</h2>
    <el-button @click="fetchOverviewData">获取用户信息</el-button>
    <el-button @click="fetchArticleData">获取文章列表</el-button>
    <el-button @click="fetchLabelData">获取标签列表</el-button>
    <el-button @click="logLabelData">dy标签列表</el-button>
    {{ id }}
  </div>
</template>

<script setup>
import { getArticleById } from '@/api/article';
import { api } from '@/utils/api';
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();

const token= localStorage.getItem('token'); // 从本地存储获取 token

const fetchOverviewData = async () => {
  try{
    // const token= localStorage.getItem('token'); // 从本地存储获取 token
    // const userId = localStorage.getItem('userId'); // 从本地存储获取 token

    const res = await axios.get(api.baseUrl + '/my/userinfo', {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
      console.log('test');
      console.log(res.data.data)
      console.log('token:' + token)

  }catch(err){
    console.log(err)
  }
}

const articleData = ref([]);

const fetchArticleData = async () => {
  try{
    // const token= localStorage.getItem('token'); // 从本地存储获取 token
    // const userId = localStorage.getItem('userId'); // 从本地存储获取 token

    const res = await axios.get(api.baseUrl + '/my/article/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    // console.log('testArticle');
    // console.log(res.data.data)
    articleData.value = res.data.data;
    // console.log(articleData.value)
  }catch(err){
    console.log(err)
  }
}

const labelList = ref([]);

const fetchLabelData = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/label/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      } 
    })

    labelList.value = res.data.data;
    console.log(labelList.value)

  } catch(err){
    console.log(err)
  }
}

const logLabelData = () => {
  console.log(labelList.value)
}

const article = ref({
});

const id = ref(0);

// 根据文章 ID 获取文章内容
onMounted(async () => {
  id.value = route.query.id
  console.log(id.value)
  try {
    const res = await getArticleById(id.value);
    article.value = res; // 假设接口返回的数据结构是 { id, title, content }
    // 打印文章
    console.log(article.value)
  } catch (err) {
    console.error('获取文章详情失败:', err);
  }
});

</script>

