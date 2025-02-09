<template>
<div class="gather">
  <RouterLink v-for="(item, index) in overList" 
       :key="item.id"
       class="card"
       :class="{gap: index > 0}"
       :style="{background: 'linear-gradient(' + item.bgColor + ')'}"
       :to="item.path">
    <div class="left">
      <span class="name">{{ item.name }}</span>
      <span class="total">{{ item.total }}</span>
    </div>
    <div class="right">
      <el-button class="btn">
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>
  </RouterLink>
</div>
</template>

<script lang="ts" setup>
import { overList, fetchOverviewData, fetchArticleList, fetchDiaryList } from '@/api/menu';
import { Plus } from "@element-plus/icons-vue";
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(async () => {
  try {
    await Promise.all([
      fetchOverviewData(),
      fetchArticleList(),
      fetchDiaryList(),
    ]);
  } catch (err) {
    console.error('数据加载失败:', err);
  }
})
</script>

<style lang="less" scoped>
.gather {
  display: flex;
  position: absolute;
  width: 80%;
  height: 130px;
  // background-color: pink;
  top: 160px;

  .gap{
    margin-left:24px;
  }

  .card{
    // display: inline-block;
    width: 320px;
    height: 100%;
    background-color: skyblue;
    border-radius: 10px;
    padding: 24px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .left{

      .name{
        color: rgb(60, 60, 60);
        margin-top: 7px;
        display: block;
      }
      .total{
        color: black;
        margin-top: 10px;
        display: block;
        font-size: 30px;
        font-weight: 600;
      }
    }

    .right{
      margin-top: 15px;

      .btn{
        width: 48px;
        height: 48px;
      }
    }
  }
}
</style>