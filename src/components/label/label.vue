<template>
<div class="label_container">
  <div class="top">

    <h3 class="title">标签</h3>
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
        title="标签名称："
        virtual-triggering
        width="300"
      >
        <el-input placeholder="请输入标签名称"
                  style="margin-bottom: 10px" 
                  v-model="createName"
                  maxlength="3"
                  show-word-limit
                   />
        <el-button size="small" style="margin-left: 165px" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确定</el-button>
      </el-popover>
    </div>

    <!-- 管理 -->
    <div class="manage_container">
      <el-icon class="manage icon"><Folder /></el-icon>
      <span @click="centerDialogVisible = true">
          管理标签
      </span>

      <!-- 管理弹窗 -->
      <el-dialog
        v-model="centerDialogVisible"
        title="文章标签管理"
        width="750"
        align-center
      >
        <labelManage/>
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

  <div class="footer">
    <el-tag class="label_menu" v-for="(item, index) in labelList"
         :key="item.id"
         :class="{'label_menu_selected': selected==item.id + 'label'}"
         @click="change(item.id, 'label')"
         type="info">
      {{ item.name }}
    </el-tag>
  </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineEmits, unref } from 'vue';
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
import { CirclePlus, Folder } from '@element-plus/icons-vue'
import labelManage from './labelManage.vue';
import { labelList, fetchLabelList, addLabel } from '@/api/label';

const emits = defineEmits(['nowlabel'])

// 当前选中
const selected = ref<string>('-1all')

// 切换
const change = (id: number|string, type: string) => {
  if(id + type !== selected.value) {
    selected.value = id + type
    emits('nowlabel', {id, type})
  }
}

// 新建
const createButtonRef = ref()
const createPopoverRef = ref()
const createClickOutside = () => {
  unref(createPopoverRef).popperRef?.delayHide?.()
}

const createName = ref('')
const confirm = async () => {
  if(createName.value) {
    await addLabel(createName.value.trim())
    // console.log(createName.value);
    ElMessage({
      message: '新建成功',
      type: 'success',
      plain: true,
    });
  } else {
    ElMessage({
      message: '请输入标签名称',
      type: 'error',
      plain: true,
    });
 }
}

// 取消
const cancel = () => {
  createName.value = ''
}

// 管理
const centerDialogVisible = ref(false)

onMounted(() => {
  fetchLabelList()
})

</script>

<style lang="less" scoped>
.label_container{
  width: 100%;
  background-color: #fff;
  padding: 16px 22px;
  border-radius: 8px;
  // display: flex;
  // justify-content: space-between;

  .top{
    display: flex;
    margin-bottom: 8px;

    .title{
      margin-right: 113px;
    }

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

  .footer{
    // display: flex;
    align-items: center;

    .label_menu{

      padding: 0 10px;
      margin-top: 10px;
      margin-right: 8px;
      background-color: #f1f0f0;
      // border-radius: 10px;
      height: 32px;
      line-height: 32px;
      user-select: none;
      cursor: pointer;
      font-size: 14px;
      color: #696868;
      letter-spacing: 1px;
      display: inline-block;
      width: 65px;
      text-align: center;
    }

    .label_menu_selected{
      background-color: #e1e0e0;
      color: #409eff;
      font-weight: 500;;
    }
  }
}
</style>