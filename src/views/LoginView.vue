<template>
<div class="login_page">
  <div class="login_form">
    <h2 class="title">登录</h2>
    <div class="input_container">

      <el-form
        ref="formdataRef"
        style="max-width: 600px"
        :model="formdata"
        :rules="rules"
        status-icon
      >   
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名"
                    v-model="formdata.username" 
                    size="large"
                    class="input">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        
        
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="请输入密码"
                    v-model="formdata.password" 
                    size="large"
                    class="input">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { api } from '../utils/api'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()

const formdataRef = ref()
const formdata = ref({
  username: '',
  password: '' 
})

// 表单验证 
// 规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
    { min: 1, max: 20, message: '用户名长度不能超过20个字符', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
    { min: 6, max: 12, message: '用户密码长度必须在6到12位之间', trigger: 'change' },
  ]
}

// 登录
// const login = async () => {
//   try {
//     const res = await axios.post(api.baseUrl + '/api/login', formdata.value, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//   } catch(err) {
//     console.log(err)
//   }
// }

const login = () => {
  // 表单验证
  formdataRef.value.validate(async (valid: any) => {
    if(valid){
      // localStorage.setItem('token', '111')
      
      const userinfo = formdata.value
      const res = await axios.post(api.baseUrl + '/api/login', formdata.value,{
        headers:{
          'Content-Type': 'application/json',
        }
      })
      console.log(res.data);
      if(res.data.status === 0 ){
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        // 登录成功后跳转到首页
        router.push('/home')
        // 将 token 存储到本地
        localStorage.setItem('token', res.data.token);
      }else if(res.data.status === 1 ){
        ElMessage({
          message: '登录失败!用户名不存在',
          type: 'error',
        })
      }else if(res.data.status === 2 ){
        ElMessage({
          message: '登录失败!密码错误',
          type: 'error',
        })
      }
      
      
    }
  })
}



</script>

<style scoped>
.login_page{
  /* z-index: 10; */
  width: 100%;
  background-color: #f1f0f0;

  .login_form{
    position: absolute;
    width: 400px;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    padding: 48px;

   .title{
      text-align: center;
      font-size: 24px;
      letter-spacing: 2px;
      margin-bottom: 48px;

    }

    .input_container{
      gap: 24px;

      .input{
        height: 40px;
        border-radius: 4px;
      }
    }

    .btn{
      width: 100%;
      height: 40px;
      margin-top: 24px;
      font-size: 16px;
      letter-spacing: 2px;
    }
  }
}
</style>