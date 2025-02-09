import { defineStore} from 'pinia'
import type { categoryType } from '@/utils/interface'

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      count: 0,
      data: [] as categoryType[]
    }
  },
  getters: {
    exclude: (state) => {
      let arr = []
      let n = state.count
      // 拿到所有ID，计算未分组数
      for(let i = 0; i < state.data.length; i++) {
        arr[i] = state.data[i].id
        // arr.push(state.data[i].id)
        n = n - state.data[i].count
      }
      return {id: arr.join(','), name: '未分组', total: n}
    }
  },
  actions: {
    categoryName(e?: number) {
      for(let i = 0; i < this.$state.data.length; i++) {
        if(this.$state.data[i].id === e) {
          return this.$state.data[i].name
        }
      }
      return '未分组'
    }
  }
})