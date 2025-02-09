<template>
<div class="category_container">
  <div class="left">
    <div class="cate_menu"
         :class="{'cate_menu_selected': selected=='-1all'}"
         @click="change(-1, 'all')">
      全部 {{ article.count }}
    </div>

    <div class="cate_menu" v-for="(item, index) in state"
         :key="item.id"
         :class="{'cate_menu_selected': selected==item.id + 'state'}"
         @click="change(item.id, 'state')">
      {{ item.name }} {{ item.count }}
    </div>
    <!-- <div class="cate_menu"
         :class="{'cate_menu_selected': selected=='-1publish'}"
         @click="change(-1, 'publish')">
      已发布 {{ state[0].count }}
    </div>

    <div class="cate_menu"
         :class="{'cate_menu_selected': selected=='-1unpublish'}"
         @click="change(-1, 'unpublish')">
      未发布 {{ state[1].count }}
    </div> -->

    <div class="cate_menu" v-for="(item, index) in categorys.list"
         :key="item.id"
         :class="{'cate_menu_selected': selected==item.id + 'category'}"
         @click="change(item.id, 'category')">
      {{ item.name }} {{ item.count }}
    </div>

  </div>

  <div class="right">
    <!-- 新建 -->
    <div class="create_container">
      <el-icon class="create icon" ><CirclePlus /></el-icon>
      <span ref="createButtonRef" 
            v-click-outside="createClickOutside"
            class="create">
        新建
      </span>

      <el-popover
        ref="createPopoverRef"
        :virtual-ref="createButtonRef"
        trigger="click"
        title="分组名称："
        virtual-triggering
        width="300"
      >
        <el-input placeholder="请输入分类名称"
                  style="margin-bottom: 10px" 
                  v-model="createName"
                   />
        <el-button size="small" style="margin-left: 165px" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确定</el-button>
      </el-popover>
    </div>

    <!-- 管理 -->
    <div class="manage_container">
      <el-icon class="manage icon"><Folder /></el-icon>
      <span @click="centerDialogVisible = true">
          管理分组
      </span>

      <!-- 管理弹窗 -->
      <el-dialog
        v-model="centerDialogVisible"
        title="文章分类管理"
        width="750"
        align-center
      >
        <CategoryManage />
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="centerDialogVisible = false">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>

    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineEmits, unref } from 'vue';
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { CirclePlus, Folder } from '@element-plus/icons-vue'
import CategoryManage from './categoryManage.vue';
import { fetchArticleData, article } from '@/api/article';
import { fetchCateList, categorys, addCate } from '@/api/category';

const emits = defineEmits(['nowCategory'])

const state = ref([
  {
    id: 0,
    name: '已发布',
    count: 0
  },
  {
    id: 1,
    name: '未发布',
    count: 0
  }
])


const getCount = () => {
  for(let i = 0; i < article.value.list.length; i++) {
    if(article.value.list[i].state === 0) {
      state.value[0].count++
    } else {
      state.value[1].count++
    }
  }
}

// 当前选中
const selected = ref<string>('-1all')

// 切换
const change = (id: number|string, type: string) => {
  if(id + type !== selected.value) {
    selected.value = id + type
    // emits('nowCategory', {id, type})
  }
}

// 新建
const createButtonRef = ref()
const createPopoverRef = ref()
const createClickOutside = () => {
  unref(createPopoverRef).popperRef?.delayHide?.()
}

const createName = ref('')
const confirm = () => {
  if(createName.value) {
    addCate(createName.value)
    // getCategory()
    createName.value = ''
    ElMessage({
      type: 'success',
      message: '创建成功' 
    })
  }
}

// 取消
const cancel = () => {
  createName.value = ''
}

// 管理
const centerDialogVisible = ref(false)

onMounted(async () => {
  await fetchArticleData()
  // 初始化数量
  getCount();
  // getCount()
  await fetchCateList()
})


</script>

<style lang="less" scoped>
.category_container{
  width: 100%;
  background-color: #fff;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;

  .left{
    display: flex;

    .cate_menu{
      padding: 0 16px;
      margin-right: 16px;
      background-color: #f1f0f0;
      border-radius: 20px;
      line-height: 32px;
      user-select: none;
      cursor: pointer;
    }

    .cate_menu_selected{
      background-color: #e1e0e0;
      color: #409eff;
      font-weight: 500;;
    }
  }

  .right{
    display: flex;
    align-items: center;

    .create_container{
      display: flex;
      align-items: center;
      color: #409eff;
      cursor: pointer;
      margin-right: 15px;
    }

   .manage_container{
      display: flex;
      align-items: center;
      color: #409eff;
      cursor: pointer;
    }

  }
}
</style>