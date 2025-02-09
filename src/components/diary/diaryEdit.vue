<template>
<div class="diary_edit">
  <div class="top">
    <input type="text" class="title" placeholder="请输入标题" v-model="diary.title" />
    <el-input
      v-model="diary.content"
      maxlength="1600"
      style="width: 100%; border: none; outline: none;"
      type="textarea"
      placeholder="请输入内容"
      class="content"
      :autosize="{ minRows: 25, maxRows: 25 }"
    />
  </div>
  <div class="foot">
    <div class="btn">
      <el-button>取消</el-button>
      <el-button type="primary" @click="add">新建笔记</el-button>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { addDiary, fetchDiaryList } from '@/api/diary';
import { ElMessage } from 'element-plus';

const diary = ref({
  title: '',
  content: ''
})


const add = async () => {
  await addDiary(diary.value)
  ElMessage({
    message: '添加成功',
    type: 'success',
    plain: true
  })

  diary.value.title = '';
  diary.value.content = '';

  await fetchDiaryList()
}
</script>

<style scoped>
.diary_edit{
  width: 100%;
  height: 100%;
  margin-left: 24px;
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  padding-bottom: 20px;

  .top{
    width: 100%;
    padding-bottom: 24px;

    .title{
      font-size: 24px;
      font-weight: bold;
      color: #555555;
      border: none;
      background: transparent;
      outline: none;
      margin-bottom: 10px;
      &::placeholder{
        color: #d6d5d5;
      }
    }

    .content{
      letter-spacing: 1px;
    }

  }

  .foot{
    padding-top: 15px;
    border-top: 2px solid #d6d5d5;

    .btn{
      display: flex;
      justify-content: flex-end;
    }
  }
}

.el-textarea{
  background: transparent;
  border: none;
  outline: none;
}
</style>