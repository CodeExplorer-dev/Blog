<template>
<el-table :data="labelList" style="width: 100%;">
    <!-- 序号 -->
    <!-- <el-table-column label="序号" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column> -->

    <!-- 名称 -->
    <el-table-column label="标签名称" width="180" >
      <template #default="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <!-- 创建日期 -->
    <el-table-column label="创建日期" width="320" >
      <template #default="scope">
        <div style="display: flex; align-items: center; ">
          <span>{{ formatDate(scope.row.date) }}</span>
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
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import { labelList, deleteLabel, fetchLabelList } from '@/api/label';
import { formatDate } from '@/utils/moment';

interface Label {
  id: number | string
  name: string | number
  date: string
}

// 删除标签
const handleDelete = (id: number | string) => {
  deleteLabel(id)
  ElMessage({
    message: '删除成功',
    type:'success',
  })
}

onMounted(() => {
  fetchLabelList()
})

let tableData: Label[] = labelList.value

</script>

<style lang="less" scoped>

</style>