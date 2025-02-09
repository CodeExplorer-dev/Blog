<template>
<div >
  <el-affix :offset="60" @change="toolbarFix">
    <Toolbar
      :class="fix ? 'fix' : ''"
      class="toolbar"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
  </el-affix>
    
  <div class="editor_main">
    <!-- <Form :id="props.id" :formdata="formdata"></Form> -->
    <Form :id="props.id" @updateFormData="updateFormData"></Form>
    <Editor
      style="height: 1000px; overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch, defineProps } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import Form from '../forms/Form.vue';
import { useArticleStore } from '@/store/editArticle';


const articleStore = useArticleStore();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(articleStore.formData.content);

watch(valueHtml, (newValue) => {
  articleStore.updateValueHtml(newValue);
});

// 监听 formData 的变化
watch(() => articleStore.formData.content, (newValue) => {
  valueHtml.value = newValue;
});

// 模拟 ajax 异步获取内容
// onMounted(() => {
//   setTimeout(() => {
//     valueHtml.value = ''
//   }, 1500)
// })

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

// 工具栏固定
const fix = ref<boolean>(false)
const toolbarFix = (e: boolean) => {
  fix.value = e
}

const props = defineProps({
  id: Number,
}) 

// 使用 watch 监听 props 的变化
watch(() => props.id, (newId, oldId) => {
  console.log('id:', newId);
});

const updateFormData = (formData: any) => {
  valueHtml.value = formData.content; // 更新编辑器的内容
};

</script>

<style scoped>
.toolbar {
  border-radius: 4px; 
  width: 100%;
}
.editor_main{
  padding: 24px 140px;
  border: none;
  margin-top: 8px;
  background-color: #fff;
}
.fix{
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}
</style>