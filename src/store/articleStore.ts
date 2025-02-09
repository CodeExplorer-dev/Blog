// store/articleStore.ts
import { updateArticle } from '@/api/article';
import { defineStore } from 'pinia';

// 定义文章的类型
interface Article {
  id: number;
  state: number;
}

export const useArticleStore = defineStore('articleStore', {
  state: () => ({
    articleList: [] as Article[], // 明确指定 articleList 的类型
    stateCount: [
      { name: '未发布', count: 0 },
      { name: '已发布', count: 0 },
    ],
  }),
  actions: {
    // 初始化文章列表和状态数量
    initializeArticles(articles: Article[]) {
      this.articleList = articles;
      this.updateStateCount();
    },
    // 更新文章状态
    async updateArticleState(articleId: number, newState: number) {
      try {
        // 调用接口更新状态
        await updateArticle(articleId, newState);

        // 更新本地文章状态
        const article = this.articleList.find((a) => a.id === articleId);
        if (article) {
          article.state = newState;
        }

        // 更新状态数量
        this.updateStateCount();
      } catch (err) {
        console.error('更新文章状态失败:', err);
        throw err;
      }
    },
    // 更新状态数量
    updateStateCount() {
      // 重置计数
      this.stateCount[0].count = 0;
      this.stateCount[1].count = 0;

      // 重新统计
      this.articleList.forEach((article) => {
        if (article.state === 0) {
          this.stateCount[0].count++;
        } else {
          this.stateCount[1].count++;
        }
      });
    },
  },
});