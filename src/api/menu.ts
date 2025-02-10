import { HomeFilled, Setting, Notebook, EditPen, User } from '@element-plus/icons-vue'
import axios from 'axios'
import { api } from './requsest'
import { ref } from 'vue'


// 菜单
export const menuList = [
  {
    id: 1,
    path: 'home',
    title: '首页',
    icon: HomeFilled
  },
  {
    id: 2,
    path: 'article',
    title: '博客文章',
    icon: Notebook
  },
  {
    id: 3,
    path: 'diary',
    title: '随笔随记',
    icon: EditPen
  },
  {
    id: 4,
    path: 'my',
    title: '个人中心',
    icon: User
  },
  {
    id: 5,
    path: 'setting',
    title: '设置',
    icon: Setting
  }
]

// 总览
export const overList = ref([
  {
    id: 1,
    path: 'addarticle',
    name: '博客文章',
    total: 0,
    bgColor: '180deg, #ff600829 0%, #ff60083d 100%',
    btnPath: 'article/add'
  },
  {
    id: 2,
    path: 'diary',
    name: '随笔随记',
    total: 0,
    bgColor: '180deg, #00c9f529 0%, #00c9f53d 100%'
  },
])

const token = localStorage.getItem('token'); // 从本地存储获取 token

export const fetchOverviewData = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/userinfo', {
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
  }catch(err){
    console.log(err)
  }
}

// 获取博客总数
export const fetchArticleList = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/article/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    overList.value[0].total= res.data.data.length
  }catch(err){
    console.log(err)
  }
}

// 获取日记总数
export const fetchDiaryList = async () => {
  try{
    const res = await axios.get(api.baseUrl + '/my/diary/list', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    overList.value[1].total= res.data.data.length
  }catch(err){
    console.log(err)
  }
}