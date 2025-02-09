import { api } from "@/utils/api";
import axios from "axios";
import { ref } from "vue";

// 日记
export const diarys = ref({
  "count": 0,
  "list":[
    {
      "id": 0,
      "title": '',
      "date": '',
      "content": '', 
    }
  ]
})

const token = localStorage.getItem('token'); // 从本地存储获取 token

// 获取日记列表
export const fetchDiaryList = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/diary/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    diarys.value.count = res.data.data.length
    diarys.value.list = res.data.data
  }catch(err){
    console.log(err)
  }
}

// 添加日记
export const addDiary = async (diary: any) => {
  console.log('添加的数据：', diary);
  try{
    const res = await axios.post(api.baseUrl + '/my/diary/add', diary, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    }) 
    fetchDiaryList()
  } catch(err){
    console.log(err) 
  }
}

// 删除日记
export const deleteDiary = async (id: number) => {
  try{
    const res = await axios.delete(api.baseUrl + `/my/diary/delete`, {
      data: {
        id: id
      },
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    fetchDiaryList()
  }catch(err){
    console.log(err)
  }
}