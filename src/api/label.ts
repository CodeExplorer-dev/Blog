import { api } from "@/utils/api";
import axios from "axios";
import { ref } from "vue";
import type { labelType } from '@/utils/interface'


const token = localStorage.getItem('token'); // 从本地存储获取 token
export const labelList = ref<labelType[]>([])

// 获取标签列表
export const fetchLabelList = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/label/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    labelList.value = res.data.data;
  }catch(err){
    console.log(err)
  }
}

// 添加标签
export const addLabel = async (labelName: string) => {
  // console.log(labelName)
  try{
    const token = localStorage.getItem('token'); // 从本地存储获取 Token
    // if (token) {
    //   axios.defaults.headers.common['Authorization'] = token; // 设置请求头
    // }
    const res = await axios.post(api.baseUrl + '/my/label/add', {
      name: labelName,
    }, {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': token,
        }
    }) 
    fetchLabelList()
  } catch(err){
    console.log(err)
  }
}

// 删除标签
export const deleteLabel = async (id: number | string) => {
  try{
    const res = await axios.delete(api.baseUrl + `/my/label/delete`, {
      data: {
        id: id
      },
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token 
      }
    }) 
    fetchLabelList()
  } catch(err){
    console.log(err)
  }
}