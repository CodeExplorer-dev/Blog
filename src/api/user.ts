import { api } from './requsest'
import axios from 'axios'
import { ref } from 'vue'

export const user = ref({
  id: 0,
  username: '',
  password: '',
  user_pic: '',
  email: '',
  introduce: ''
})

export const getUserData = async () => {
  try{
    const token = localStorage.getItem('token'); // 从本地存储获取 token
    const res = await axios.get(api.baseUrl + '/my/userinfo', {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
      user.value.username = res.data.data.username
      // user.value.password = res.data.data.password
      user.value.user_pic = res.data.data.user_pic
      user.value.email = res.data.data.email
      user.value.introduce = res.data.data.introduce
  }catch(err){
    console.log(err)
  }
}
