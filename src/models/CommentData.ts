export interface CommentData {
  author: string
  body: string
  children?: CommentData[]
  created_utc: number
  depth: number
  downs: number
  id: string
  parent_id?: string
  permalink: string
  ups: number
}