<template>
  <div class="diary_item">
    <div class="top">
      <div class="left">
        <div class="title">{{ props.data?.title }}</div>
        <div class="date">{{ formatDate(props.data?.date!) }}</div>
      </div>
      <div class="right">
        <el-popconfirm
          confirm-button-text="确定"
          title="确定删除"
          @confirm="deletediary"
          class="popconfirm"
        >
          <template #reference >
            <el-icon size="20px" class="delete"><Delete /></el-icon>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="middle">
      {{ props.data?.content }}
    </div>
</div>
</template>
  
<script lang="ts" setup>
import type { DiaryType } from '@/utils/interface';
import { Delete } from '@element-plus/icons-vue';
import { formatDate } from '@/utils/moment';

  
type diaryItemProps = {
  data?: DiaryType
}
  
const props = withDefaults(defineProps<diaryItemProps>(), {
})
  
const emits = defineEmits(['delete'])
  
// 删除文章
const deletediary = () => {
  emits('delete',props.data!.id)
}

</script>
  
<style scoped>
.diary_item{
  border-radius: 8px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;

  .top{
    display: flex;
    justify-content: space-between;

    .left{
      width: 200px;
      height: 100%;

      .title{
        font-size: 20px;
        margin-bottom: 7px;
      }

        .date{
          font-size: 14px;
          color: #979797;
        }
      }

     .right{
        width: 100px;
        height: 100%;

        .delete{
          cursor: pointer;
          color: #979797;
          margin-left: 80px;
          transition: color .2s;
          display: none;

          &:hover{
            color: #2b5aed;
          }
        }

        .popconfirm:hover .delete{
          display: block;
        }

      }
      &:hover{
        .delete{
          display: block;
        }
      }
    }

    .middle{
      letter-spacing: 1px;
      line-height: 28px;
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }
  </style>
  