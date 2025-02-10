import { api } from "./requsest";
import axios from "axios";
import { ref } from "vue";

export const categorys = ref({
  "count": 0,
  "list":[
    {
      "id": 0,
      "name": '',
      "date": '',
      'count': 0
    }
  ]
})

const token = localStorage.getItem('token'); // 从本地存储获取 token

// 获取分类列表
export const fetchCateList = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/category/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    }) 
    categorys.value.count = res.data.data.length
    categorys.value.list = res.data.data
  }catch(err){
    console.log(err) 
  }
}

// 添加分类
export const addCate = async (name: string) => {
  try{
    const res = await axios.post(api.baseUrl + '/my/category/add', { name: name }, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      } 
    })
    fetchCateList()
  } catch(err){
    console.log(err)
  }
}

// 修改分类名称
export const updateCateName = async (newName: string) => {
  try{
    const res = await axios.post(api.baseUrl + '/my/category/update', { newName }, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      } 
    })
  }catch(err){
    console.log(err)
  }
}

