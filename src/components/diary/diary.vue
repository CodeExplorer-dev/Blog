<template>
  <div>
    <div class="diary">
    <!-- <el-button @click="getdiaryList">获取日记列表</el-button> -->
    <DiaryItem 
      v-for="(item, index) in diaryList" 
      :data="item" 
      :key="item.id" 
      @delete="deletediary"/>
  </div>
  <div class="pagination" v-if="count > props.pageSize">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="request.pageSize"
      @change="changePage"
    />
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import DiaryItem from './diary_item.vue';
import type { DiaryType } from '@/utils/interface';
import { ElMessage } from 'element-plus'
import { diarys, fetchDiaryList, deleteDiary  } from '@/api/diary';

const props = defineProps({
  pageSize:{
    type: Number,
    default: 4
  }
})
  
const request = {
  pageSize: props.pageSize, // 每页数量
  nowPage: 1, // 当前页码
}
  
const diaryList = ref<DiaryType[]>([])

// 日记数量
const count = ref<number>(0)
  
const getdiary = () => {
  if(request.nowPage === 1){
    count.value = diarys.value.count
  }
  const start = (request.nowPage - 1) * request.pageSize;
  const end = request.nowPage * request.pageSize;
  let arr =  diarys.value.list.slice(start, end); // 分页后的数据
  diaryList.value = [...arr]; // 更新列表
}

// 删除日记
const deletediary = async (id: number) => {
  await deleteDiary(id)
  ElMessage({
    type:'success',
    message: '删除成功',
  })
  await fetchDiaryList()
  // 更新分页数据
  getdiary();
}

// 切换页码
const changePage = (page: number) => {
  request.nowPage = page
  getdiary()
}
  
onMounted(async () => {
  await fetchDiaryList()
  getdiary()
})

</script>
  

<style scoped>
.diary{
  width: 100%;
}
.pagination{
  margin: 20px 0 20px 400px; 
}

</style>

