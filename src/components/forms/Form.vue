<template>
<div class="form">
  <div class="top">
    <!-- 标题，分类，标签 -->
    <div class="left">
      <input type="text" class="title" placeholder="请输入标题" v-model="formData.title">
      <el-select
        v-model="categoryId"
        placeholder="选择分类"
        style="width: 120px"
        @change="categorySelect(categoryId)"
        clearable
      >
        <el-option
          v-for="item in categorys.list"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div class="label_container">
        <el-tag
          v-for="(label, index) in formData.labels"
          :key="index"
          closable
          :disable-transitions="false"
          round
          class="tag"
          @close="deleteLabel(label)"
        >
          {{ label }}
        </el-tag>

        <el-button plain @click="visible = true" v-show="formData.labels.length < 3">
          插入标签
        </el-button>
        <!-- 标签弹窗 -->
        <el-dialog
          v-model="visible"
          title="标签"
          width="600"
          align-center
        >
          <div class="dialog_body">
            <el-input v-model="inputLabel" class="input_label" placeholder="请输入标签回车确定" @change="addLabelforForm"></el-input>
            <el-tag
              v-for="(label, index) in formData.labels"
              :key="index"
              closable
              :disable-transitions="false"
              round
              class="tag"
              @close="deleteLabel(label)"
            >
              {{ label }}
            </el-tag>

            <div class="all_label">
              <el-tag 
                v-for="tag in labelArr" 
                type="primary" 
                round
                class="tag" 
                style="margin-top: 10px"
                @click="selectLabel(tag)"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="visible = false">取消</el-button>
              <!-- <el-button type="primary" @click="confirm"> -->
              <el-button type="primary"  @click="visible = false">
                确定
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>
      <div>
        <p class="introduce">简介:</p>
      </div>
    </div>

    <!-- 图片 -->
    <div class="right">
      <el-upload
        class="cover-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="cover" />
        <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
        <span class="text">选择封面</span>
      </el-upload>
    </div>
  </div>

  <!-- 简介 -->
  <div class="mid">
    <el-input
      v-model="formData.introduce"
      :autosize = "{ minRows: 3, maxRows: 5 }"
      type="textarea"
      placeholder="请输入简介"
      class="input_introduce"
    />
  </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, watch, defineEmits } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import type { labelType } from '@/utils/interface'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useArticleStore } from '@/store/editArticle';
import { labelList, fetchLabelList, addLabel } from '@/api/label';
import { categorys } from '@/api/category';
import { getArticleById } from '@/api/article';

const articleStore = useArticleStore();

const formData = ref<any>(articleStore.formData);

watch(formData, (newData) => {
  articleStore.updateFormData(newData);
});

const resetFormData = () => {
  formData.value = {
    title: '',
    categoryId: 0,
    labels: [],
    introduce: '',
    cover: '',
    content: '',
  };
};

// 分类名称
const categoryId = ref()

// 获取分类
const categoryList = ref()
const getCategory = () => {
  categoryList.value = categorys.value.list
}

const categorySelect = (id: any) => {
  formData.value.categoryId = categoryId.value
}

// 封面
const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 标签
// 所有标签
const labelData = ref<labelType[]>([])
const labelArr = ref<any[]>([])
const getLabel = () => {
  // formData.value.labels = labelList.value
  labelData.value = labelList.value
  for(let i = 0; i < labelData.value.length; i++){
    labelArr.value.push(labelData.value[i].name)
  }
}

// 关闭标签
const deleteLabel = (tag: number | string) => {
  labelArr.value.unshift(tag)
  formData.value.labels = formData.value.labels.filter(
    (item: number | string) => item !== tag
  )
} 

// 标签弹窗
const visible = ref<boolean>(false)
const inputLabel = ref<string>('')

// 添加标签
const addLabelforForm = () => {
  if(inputLabel.value && formData.value.labels.length < 3){
    formData.value.labels.push(inputLabel.value)
    addLabel(inputLabel.value.trim())
    inputLabel.value = ''
  }
}

// 选择标签
const selectLabel = (tag: string) => {
  if(formData.value.labels.length < 3){
    formData.value.labels.push(tag)
    labelArr.value = labelArr.value.filter(item => item !== tag)
  }
}

const confirm = () => {
  console.log(formData.value)
}

const props = defineProps({
  id: Number
})

const emit = defineEmits(['updateFormData']);

watch(() => props.id, async (newId) => {
  if (newId) {
    try {
      const res = await getArticleById(newId);
      if (res.status === 0 && res.data) {
        console.log('获取到的文章详情:', res.data);

        // 将字符串形式的标签转换为数组
        const labelsArray = res.data.labels ? res.data.labels.split(',').map((label:any) => label.trim()) : [];

        // 设置 formData
        formData.value = {
          title: res.data.title,
          categoryId: res.data.categoryId,
          labels: labelsArray,
          introduce: res.data.introduce,
          cover: res.data.cover,
          content: res.data.content,
        };
      } else {
        console.error('获取文章详情失败:', res.message);
      }
    } catch (err) {
      console.error('获取文章详情失败:', err);
    }
  }else{
    resetFormData()
  }
}, { immediate: true });

onMounted(async () => {
  await fetchLabelList()
  getCategory()
  getLabel()
})

</script>

<style lang="less" scoped>
.form{

  .top{
    display: flex;
    justify-content: space-between;

    .left{

      .title{
        border: none;
        outline: none;
        display: block;
        font-size: 24px;
        font-weight: 600;
        margin:16px 0 25px 0;
        &::placeholder{
          color: #d6d5d5;
        }
      }

      .label_container{
        display: inline-block;
        margin-left: 15px;

        .dialog_body{

          .input_label{
            margin-bottom: 15px;
          }

          .all_label{
            margin-top: 15px;

          }
        }
      }

      .introduce{
        font-size: 16px;
        color: #9c9c9c;
        margin-top: 57px;
      }
    }

    .right{
      position: relative;

      .text{
        position: absolute;
        top: 65%;
        color: #8c939d;
      }
    }
  }

  .mid{
    margin-top: 20px;

    .input_introduce{
      border: none;
      outline: none;
      width: 100%;
    }
  }
}

.tag{
  margin-right: 10px;
  cursor: pointer;
  letter-spacing: 1px;
}

.cover-uploader .cover {
  width: 178px;
  height: 178px;
  display: block;
}

</style>

<style>
.cover-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.cover-uploader .el-upload:hover {
  border: 1px solid #8c939d;;
}

.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>