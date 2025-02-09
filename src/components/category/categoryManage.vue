<template>
<el-table :data="tableData" style="width: 100%">
    <!-- 名称 -->
    <el-table-column label="名称" width="180">
      <template #default="scope">
          <el-input v-model="scope.row.name" 
                    @focus="focusCategory(scope.row.id)"
                    @blur="blurCategory(scope.row.id)"/>
      </template>
    </el-table-column>

    <!-- 关联文章数 -->
    <el-table-column label="关联文章数" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.count }}</span>
        </div>
      </template>
    </el-table-column>

    <!-- 创建日期 -->
    <el-table-column label="创建日期" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ formatDate(scope.row.date) }}</span>
        </div>
      </template>
    </el-table-column>

    <!-- 操作 -->
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { categorys } from '@/api/category';
import { useCategoryStore } from '@/store/category';
import { formatDate } from '@/utils/moment';
import { ElMessage } from 'element-plus';

const categoryStore = useCategoryStore();

interface User {
  id: number
  name: string
  count: number
  date: string
}

// 当前分组名称
let nowName :number | string 
// 聚焦
const focusCategory = (id: number | string) => {
  let result = categoryStore.data.find((item: { id :number | string}) => item.id === id)
  if(result){
    nowName = result.name
  }
}

// 失焦
const blurCategory = (id: number | string) => {
  let result = categoryStore.data.find((item: { id :number | string}) => item.id === id)
  if(result && result.name !== nowName){
    ElMessage({
      message: '修改成功',
      type:'success',
    })
  }
}

// 删除分组
const handleDelete = (e: number | string) => {
  categoryStore.data = categoryStore.data.filter(
  // category.data.list = category.data.list.filter(
    (obj: {count: any; id: number | string}) => {
      if(obj.id === e){
        categoryStore.exclude.total += obj.count
        // 更新表格数据
        tableData.splice(tableData.findIndex((item: { id: number | string }) => item.id === e), 1)
        
      }
      return obj.id !== e
    }
  )
  ElMessage({
    message: '删除成功',
    type:'success',
  })
}

const tableData: User[] = categorys.value.list
  
</script>

<style lang="less" scoped>

</style>