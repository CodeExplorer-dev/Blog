<template>
  <div class="head">
    <div class="left">
      <span style="cursor: pointer;" 
            @click="backHome"
            title="返回首页">MyBlog</span>
    </div>
    <div class="right">
      <div class="avatar" @click="toMy">
        <el-avatar :size="40" :src="circleUrl" />
      </div>
      <!-- <el-icon size="20px" class="theme"><Sunny /></el-icon> -->
      <el-button type="primary" @click="exit">退出</el-button>
    </div>
  </div>

  <!-- 抽屉私信 -->
  <el-drawer v-model="visible" :show-close="false">
    <template #header="{ close }">
      <h2 class="title">私信</h2>
      <el-button @click="close">
        <el-icon><Close /></el-icon>
      </el-button>
    </template>
    敬请期待...
  </el-drawer>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { ElButton, ElDrawer } from 'element-plus'
import axios from 'axios';
import { api } from '@/api/requsest'

const circleUrl = ref('')

// 返回总览
const router = useRouter()
const backHome = () => {
  router.push('/home')
}

const visible = ref(false)

const exit = () => {
  // 删除本地存储的 token
  localStorage.removeItem('token');
  router.push('/login')
}

const getAvatar = async () => {
  try{
    const token = localStorage.getItem('token'); // 从本地存储获取 token
    const res = await axios.get(api.baseUrl + '/my/userinfo', {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
      circleUrl.value = res.data.data.user_pic
  }catch(err){
    console.log(err)
  }
}

const toMy = () => {
  router.push('/my') 
}

onMounted(() => {
  getAvatar()
})
</script>

<style scoped>
.head{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background-color: #fff;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left{
    margin-left: 30px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .right{
    display: flex;
    align-items: center;
    margin-right: 30px;

    .message{
      cursor: pointer;
    }

    .avatar{
      margin: 15px;
      cursor: pointer;
    }

   /* .theme{
      margin-right: 15px;
      cursor: pointer;
    } */
  }
}
</style>