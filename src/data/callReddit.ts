import axios from 'axios'
import { CommentData } from '../models/CommentData'

export const recursivelyNestCommentData = (parent: CommentData, possibleChildren: CommentData[]) => {
  const[childrenOfParent, otherChildren] = possibleChildren.reduce((acc: CommentData[][], curr: CommentData) => {
    if (curr.parent_id === parent.id) {
      acc[0].push(curr)
    }
    else {
      acc[1].push(curr)
    }
    return acc
  }, [[],[]])
  
  if (!childrenOfParent.length) {
    return []
  }

  if (!otherChildren.length) {
    return childrenOfParent
  }

  return childrenOfParent.map(child => ({
      ...child,
      children: recursivelyNestCommentData(child, otherChildren)
  }))
  
}

export const formatCommentData = (comments: CommentData[]): CommentData[] => {
  const [theRest, topLevel] = comments.reduce((acc: CommentData[][], curr: CommentData) => {
    if (curr.parent_id) {
      acc[0].push(curr)
    }
    else {
      acc[1].push(curr)
    }
    return acc
  },[[],[]])

  if (!theRest.length) {
    return topLevel
  }

  return topLevel.map(parent => ({
    ...parent,
    children: recursivelyNestCommentData(parent, theRest)
  }))
}

export const getRedditPost = (success: Function, failure: Function): void => {
  axios.get(
    'https://gist.githubusercontent.com/mkg0/6a4dca9067ad7a296204e7c9ecd977b0/raw/0b1ec16580ea1e970a73f5c85563c22631be7ad7/unpopularopinion-dataset.json'
  )
  .then(res => {
    const formattedComments = formatCommentData(res.data.comments)
    success({
      ...res.data,
      formattedComments
    })
  })
  .catch(_ => failure())
}
