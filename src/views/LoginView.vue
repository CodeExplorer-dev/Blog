<template>
<div class="login_page">
  <div class="form" v-if="model === true">
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

      <div class="switch">
        <p @click="switchModel">没有账号? 立即注册</p>
      </div>
    </div>
  </div>

  <div class="form" v-if="model === false">
    <h2 class="title">注册</h2>
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

        <!-- 确认密码 -->
        <el-form-item prop="confirmPassword">
          <el-input placeholder="请再次输入密码"
                    v-model="formdata.confirmPassword"
                    size="large"
                    class="input">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register" class="btn">注册</el-button>
        </el-form-item>
      </el-form>

      <div class="switch">
        <p @click="switchModel">已有账号? 去登录</p>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { api } from '@/api/requsest'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()

const model = ref(true)


const formdataRef = ref()
const formdata = ref({
  username: '',
  password: '',
  confirmPassword: '', 
})

const switchModel = () => {
  model.value = !model.value 
  formdata.value = {
    username: '',
    password: '',
    confirmPassword: '',	
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
	if (value === '') {
		callback(new Error('请再次输入密码'))
	} else if (value !== formdata.value.password) {
		callback(new Error('两次输入密码不一致!'))
	} else {
		callback()
	}
}

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
  ],
  confirmPassword: [
		{ required: true, message: '请再次输入密码', trigger: ['blur', 'change'] },
		{ validator: validateConfirmPassword, trigger: 'change' },
	],
}

const login = () => {
  // 表单验证
  formdataRef.value.validate(async (valid: any) => {
    if(valid){
      // localStorage.setItem('token', '111')
      const { username, password } = formdata.value
      const userinfo = {
        username,
        password,
      }
      const res = await axios.post(api.baseUrl + '/api/login', userinfo, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
      if(res.data.status === 0 ){
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        // 登录成功后跳转到首页
        router.push('/home')
        // 将 token 存储到本地
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('loginTime', new Date().getTime().toString());
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

const register = () => {
  // 表单验证
  formdataRef.value.validate(async (valid: any) => {
    if(valid){
      // localStorage.setItem('token', '111')
      const { username, password } = formdata.value
      const userinfo = {
        username,
        password,
      }
      const res = await axios.post(api.baseUrl + '/api/register', userinfo, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
      if(res.data.status === 0 ){
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
        // 注册成功后跳转到登录
        router.push('/login')
      }else if(res.data.status === 1 ){
        ElMessage({
          message: '注册失败!',
          type: 'error',
        })
      }else if(res.data.status === 2 ){
        ElMessage({
          message: '用户名被占用',
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

  .form{
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
.switch{
  cursor: pointer;
  text-align: center;
  color: #242525;
  &:hover{
    color: #474848;
    text-decoration: underline;
  }
}
</style>