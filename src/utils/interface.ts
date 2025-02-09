export interface categoryType {
  id: number ,
  name: string ,
  count: number ,
  date: string
}

// 标签
export interface labelType {
  id: number | string,
  name: string | number,
  date: string
}

// 文章
export interface ArticleType {
  id: number,
  title: string,
  categoryId: number,
  date: Date,
  label: string[],
  introduce: string,
  cover?: string,
  state: number,
  content: string,
}
// 日记
export interface DiaryType {
  id: number,
  title: string,
  date: string,
  content: string,
}