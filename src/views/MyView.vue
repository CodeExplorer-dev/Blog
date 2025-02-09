<template>
  <div >
    <h2>个人中心</h2>
  </div>

  <div class="userinfo">
    <!-- <div v-for="(item, index) in userinfo" class="user_item">
      <div class="title">{{ item.title }}</div>
      <div>{{ item.content }}</div>
    </div> -->
    <div  class="user_item">
      <div class="title">头像</div>
      <div class="avatar">
        <el-avatar :size="40" :src="circleUrl" />
      </div>
    </div>
    <div v-for="(item, index) in userinfo" class="user_item">
      <div class="title">{{ item.title }}</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup>
import { user, getUserData } from '@/api/user';
import { onMounted, ref } from 'vue';

const circleUrl = ref('')
circleUrl.value = user.value.user_pic

const userinfo = ref([
  {
    id: 1,
    title: '用户名',
    content: user.value.username
  },
  {
    id: 2,
    title: '邮箱',
    content: user.value.email
  },
  {
    id: 3,
    title: '自我介绍',
    content: user.value.introduce
  }
])

onMounted(async () => {
  await getUserData() 
})

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
.userinfo{
  position: absolute;
  top: 160px;
  width: 80%;
  height: 400px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;

  .user_item{
    display: flex;
    margin: 20px 0;
    justify-content: flex-start;
    height: 50px;
    align-items: center;
    cursor: pointer;

    &:hover{
      background-color: #ddd;
    }

    .title{
      /* width: 100%; */
      font-size: 18px;
      font-weight: 500; 
      margin-right: 20px;
      text-align: right; /* 标题右对齐 */
      width: 80px;
      letter-spacing: 1px;
    }

    .content{
      color: #6d6c6c;
    }
  }
}
</style>