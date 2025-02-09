<template>
<div>
  <ArticleItem 
    v-for="(item, index) in articleList" 
    :data="item" 
    :key="item.id" 
    @delete="deleteArticle" 
    @state="changeState"/>
</div>
<div class="pagination">
  <el-pagination
    v-if="count > request.pageSize"
    background
    layout="prev, pager, next"
    :total="count"
    :page-size="request.pageSize"
    @change="changePage"
  />
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ArticleItem from './article_item.vue';
import { ElMessage } from 'element-plus'
import { article, fetchArticleData, delArticle, updateArticle } from '@/api/article';

const props = defineProps({
  pageSize:{
    type: Number,
    default: 4
  },
  categoryId:{
    type: Number,
    default: -1
  },
  state:{
    type: Number,
    default: 0
  },
  search:{
    type: String,
    default: ''
  }
})

const request = {
  pageSize: props.pageSize, // 每页数量
  nowPage: 1, // 当前页码
  state: props.state, // 状态
  categoryId: props.categoryId, // 分类id
  search: props.search, // 搜索
}

// 获取文章
const articleList = ref<any[]>([]);
// 文章数量
const count = ref<number>(0)

const getArticle = (e:boolean) => {
  if(e){
    count.value = article.value.count
  }
  const start = (request.nowPage - 1) * request.pageSize;
  const end = request.nowPage * request.pageSize;
  articleList.value = article.value.list.slice(start, end); // 分页后的数据
}

// 删除文章
const deleteArticle = async (id:number) => {
  try {
    await delArticle(id); // 等待删除操作完成
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
    console.log('删除文章成功');
    // articleList.value = articleList.value.filter(item => item.id !== id)
    await fetchArticleData(); // 删除成功后刷新文章列表
    getArticle(false); // 更新分页数据
  } catch (err) {
    ElMessage({
      type: 'error',
      message: '删除失败',
    });
    console.log('删除文章失败', err);
  }
  
}

// 修改状态
const changeState = async (e: { id: number; state: number }) => {
  try {
    // 找到对应的文章
    const article = articleList.value.find((i: { id: number }) => i.id === e.id);
    if (!article) {
      ElMessage.error('未找到对应的文章');
      return;
    }

    const newState = article.state === 0 ? 1 : 0; // 如果是未发布，则改为已发布，反之亦然

    // 更新文章状态
    await updateArticle(e.id, newState); // 调用接口更新状态
    article.state = newState; // 更新本地状态

    await fetchArticleData(); // 更新文章列表
    getArticle(false); // 更新分页数据

    // 提示用户
    if (newState === 0) {
      ElMessage.success('发布成功');
    } else {
      ElMessage.success('撤回成功');
    }
  } catch (err) {
    console.error('修改状态失败:', err);
    ElMessage.error('修改状态失败');
  }
};

// 编辑文章
const editArticle = (id: number) => {
  console.log('编辑文章', id);
}

// 切换页码
const changePage = (page: number) => {
  request.nowPage = page
  getArticle(false)
}

onMounted(async () => {
  await fetchArticleData()
  // getCount()
  getArticle(true)
})

</script>

<style scoped>
.pagination{
  margin: 24px 0 30px 600px;
  /* background-color: #9c9c9c; */
}
</style>