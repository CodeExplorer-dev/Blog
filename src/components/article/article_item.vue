<template>
<div class="article_item">
  <div class="left">
    <div class="cover">
      <el-image
        style="width: 160px; height: 120px"
        :src="cover"
        :zoom-rate="1.2"
        :max-scale="7"
        :min-scale="0.2"
        :initial-index="4"
        fit="cover"
      />
      <p class="unpublished" v-if="props.data?.state === 1">未发布</p>
    </div>
  </div>
  <div class="right">
    <p class="title">{{ props.data.title }}</p>
    <p class="introduce">{{ props.data.introduce }}</p>
    <div class="bottom">
      <div class="bottom_left">
        <div class="bottom_left_item" 
             style="margin-right: 5px;">
          {{ getCategoryName(props.data.categoryId) }}
        </div>


        <div class="bottom_left_item" 
             style="margin-right: 15px;">
           /
          <span v-for="item in props.data.label">{{ item }}</span>
        </div>

        <div class="bottom_left_item">{{ formatDate(props.data.date) }}</div>

      </div>
      <div class="bottom_right">
        <el-tooltip
          effect="dark"
          content="发布"
          placement="bottom" 
          v-if="props.data?.state === 1"
        >
          <el-icon size="25px" class="box_item" @click="changeState(1)"><Position /></el-icon>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="撤回发布"
          placement="bottom"
          v-if="props.data?.state === 0"
        >
          <el-icon size="25px" class="box_item" @click="changeState(0)"><Back /></el-icon>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="编辑"
          placement="bottom"
        >
          <el-icon size="25px" class="box_item" @click="edit"><EditPen /></el-icon>
        </el-tooltip>
        
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          title="确定删除"
          @confirm="deleteArticle"
        >
          <template #reference >
            <el-icon size="25px" class="box_item"><Delete /></el-icon>
          </template>
        </el-popconfirm>
          
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import type { ArticleType } from '@/utils/interface';
import { computed, onMounted } from 'vue';
import { useCategoryStore } from '@/store/category';
import { Position, Delete, Back, EditPen } from '@element-plus/icons-vue';
import { fetchArticleData } from '@/api/article';
import { formatDate } from '@/utils/moment';
import { categorys, fetchCateList } from '@/api/category';
import { useRouter } from 'vue-router';

const categoryStore = useCategoryStore()

type ArticleItemProps = {
  data: ArticleType
}

const props = defineProps<ArticleItemProps>()

const emits = defineEmits(['delete', 'state'])

// 封面地址
const cover = computed(() => {
  return '@/assets/images/' + props.data?.cover
})


// 删除文章
const deleteArticle = () => {
  emits('delete',props.data.id)
}

// 修改状态
const changeState = async (state: number) => {
  emits('state',{id: props.data.id, state: state})
}

const router = useRouter()

// 编辑
const edit = () => {
  console.log('编辑', props.data.id)
  router.push({
    path: '/editarticle',
    query: {
      id: props.data.id,
    },
  })
}

// 获取分类名称,传入分类id，返回分类名称
const getCategoryName = (categoryId: number) => {
  for(let i = 0; i < categorys.value.list.length; i++){
    if(categoryId === categorys.value.list[i].id){
      return categorys.value.list[i].name
    }
  }
}

onMounted(() => {
  fetchArticleData()
  fetchCateList()
})

</script>

<style scoped>
.article_item{
  display: flex;
  border-radius: 8px;
  background-color: #fff;
  padding: 24px;
  margin-bottom: 24px;
  cursor: pointer;

  .left{

    .cover{
      position: relative;
      

      .unpublished{
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        background-color: rgba(43, 90, 237, 0.8);
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        line-height: 36px;
        
      }
    }
  }

  .right{
    width: 100%;
    height: 124px;
    /* background-color: skyblue; */
    margin-left: 24px;
    position: relative;

    .title{
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .introduce{
      font-size: 14px;
      line-height: 1.5;
      letter-spacing: 1px;
    }

    .bottom{
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;

      .bottom_left{
        display: flex;

        .bottom_left_item{
          font-size: 14px;
          color: #979797;
        }

        .icon{
          color: #979797;
          align-items: center;
        }
      }

      .bottom_right{
        display: flex;

        .box_item{
          color: #979797;
          cursor: pointer;
          margin-left: 25px;

          &:hover{
            color: #2b5aed;
          }
        }
      }
    }
  }
}
</style>
