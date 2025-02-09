import { defineStore } from 'pinia';

export const useArticleStore = defineStore('article', {
  state: () => ({
    formData: {
      title: '',
      categoryId: 0,
      labels: [],
      introduce: '',
      cover: '',
      content: '',
    }, 
  }),
  actions: {
    updateFormData(data: any) {
      this.formData = data;
    },
    updateValueHtml(html: string) {
      this.formData.content = html;
    },
  },
});
