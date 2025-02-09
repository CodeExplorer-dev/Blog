import { api } from "@/utils/api";
import axios from "axios";
import { ref } from "vue";

// 文章
export const article = ref({
    "count": 0,
    "list":[
      {
        "id": 0,
        "userId": 0,
        "cover": '', // 封面
        "title": '',
        "date": '',
        "labels": [],
        "introduce": '',
        "content": '',
        "views": 0,
        "comment": 0,
        "praise": 0,
        "categoryId": 0,
        "state": 0,
      }
    ]
})

const token= localStorage.getItem('token'); // 从本地存储获取 token

export const fetchArticleData = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/article/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    article.value.count = res.data.data.length;
    article.value.list = res.data.data;
  }catch(err){
    console.log(err)
  }
}

// 获取文章详情
export const getArticleById = async (id: any) => {
  console.log('获取文章详情：', id);
  try{
    const res = await axios.get(api.baseUrl + `/my/article/detail/${id}`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }) 
    return res.data
  } catch(err){
    console.log(err) 
  }
}

// 添加文章
export const addArticle = async (data:any, state: number) => {
  console.log('添加文章：', data);
  console.log('state：', state)
  try{
    const res = await axios.post(api.baseUrl + '/my/article/add', {
      ...data,
     state: state
    }, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }) 
    console.log(res.data)
  } catch(err){
    console.log(err)
  }
} 

// 删除文章
export const delArticle = async (id:number) => {
  console.log('删除文章：', id);
  try{
    const res = await axios.delete(api.baseUrl + '/my/article/delete', {
      data: {
        id: id
      },
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    console.log(res.data)
  } catch(err){
    console.log(err)
  }
}

// 修改文章状态
export const updateArticle = async (id:number, state:number) => {
  console.log('修改文章状态：', id, state);
  try{
    const res = await axios.post(api.baseUrl + '/my/article/update', {
      id: id,
      state: state
    }, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }) 
    console.log(res.data)
    fetchArticleData()
  } catch(err){
    console.log(err)
  }
}

// 更新文章
export const updateArticleById = async (id: number, state: number,  data: any) => {
  console.log('更新文章：', id, data, state);  
  try{
    const res = await axios.post(api.baseUrl + '/my/article/edit', {
      id: id,
      state: state,
      ...data 
    },{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    console.log(res.data)
    fetchArticleData()
    return res.data
  }catch(err){
    console.log(err) 
  }
}