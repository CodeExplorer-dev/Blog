<template>
  <div class="title">
    <h2>随笔随记</h2>
    <el-input
      v-model="searchInput"
      style="max-width: 400px; min-height: 40px;"
      placeholder="请输入标题"
      class="search"
    >
      <template #append><el-button :icon="Search" @click="search"/></template>
    </el-input>
  </div>

  <div class="body" style="width: 80%;">
    <Diary style="width: 60%;"></Diary>
    <DiaryEdit style="flex:none; width: 550px;"></DiaryEdit>
  </div>
</template>

<script setup>
import { fetchDiaryList } from '@/api/diary';
import Diary from '@/components/diary/diary.vue';
import DiaryEdit from '@/components/diary/diaryEdit.vue';
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const searchInput = ref('');

const search = () => {
  console.log(searchInput.value)
}

</script>

<style scoped>
h2{
  font-size: 24px;
  font-weight: 500;
  padding-left: 10px;
  position: absolute;
  width: 100%;
  top: 90px;
}

.search{
  position: absolute;
  right: 110px;
  top: 90px;
}

.body{
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 160px;
  width: 80%;
}

</style>