// import axios from 'axios'
import React, {Component} from 'react'
import {MaterialCommunityIcons, FontAwesome} from 'react-web-vector-icons'
import './Post.css';
import {Comment} from './Comment'
import {CommentData} from '../models/CommentData'
import {formatNumberK, calculatePoints} from '../utils/formatter'
import {getRedditPost} from '../data/callReddit'
import Loader from 'react-loader-spinner'

interface State {
  data: any
  isError: boolean
  isLoading: boolean
  sortByDate: boolean
}

export class Post extends Component<{}, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      data: {},
      isError: false,
      isLoading: true,
      sortByDate: false
    } 
    this.setError = this.setError.bind(this)
    this.setData = this.setData.bind(this)
    this.renderComments = this.renderComments.bind(this)
    this.renderSortedComments = this.renderSortedComments.bind(this)
    this.sortToggle = this.sortToggle.bind(this)
  }
  componentDidMount() {
    getRedditPost(this.setData, this.setError)
  }

  setData(data): void {
    this.setState({data, isError: false, isLoading: false})
  }

  setError(): void {
    console.log(this)
    this.setState({isError: true, isLoading: false})
  }

  
  renderComments(comments: CommentData[]) {
    return comments.map((c: CommentData) => {
      if(!c.children || !c.children.length) {
        return <Comment key={c.id} data={c}></Comment>
      }
      return(
        <Comment key={c.id} data={c}>
          {this.renderComments(c.children)}
        </Comment>
      )
    })
  }

  renderSortedComments(comments: CommentData[]) {
    const sorted = comments.sort((a, b) => a.created_utc - b.created_utc)
    return sorted.map((c: CommentData) => {
      return <Comment key={c.id} data={c}></Comment>
    })
  }

  sortToggle() {
    this.setState({sortByDate: !this.state.sortByDate})
  }

  render() {
    const {data, isLoading, isError} = this.state
    console.log({data})
    if (isLoading) {
      return (
        <div className='loading'>
          <Loader
            type='Oval'
            color='#666666'
            height={100}
            width={100}
          />
        </div>
      )
    }
    else if (isError) {
      return (<div>{'something went wrong'}</div>)
    }

    return (
      <div className='Main'>
        <div className='titles-container'>
          <div className='subreddit-title'>{data.subreddit_name_prefixed}</div>
          <div className='post-title-container'>
            <div className='upvotes'>{calculatePoints(data.ups, data.downs)}</div>
            <div className='post-title'>{data.title}</div>
          </div>
        </div>
        <div className='post-container'>
          <div className='post-text-container'>
            <div className='post-text'>{data.selftext}</div>
            <div className='comment-number'>
              <div className='icon'>
                <MaterialCommunityIcons
                  name='message-reply'
                  color='#2C2C2C'
                  size={15}
                />
              </div>
              {`${formatNumberK(data.comments.length)} Comments`}
            </div>
          </div>
          <div className='sort-toggle' onClick={() => this.sortToggle()}>
            <div className='sort-text'> 
              {this.state.sortByDate ? 'Comments sorted by date': 'Comments not sorted'}
            </div>
            <FontAwesome 
              name={this.state.sortByDate ? 'toggle-on' : 'toggle-off'} 
              color='#2C2C2C' 
              size={20}
            />
          </div>
          <div className='comments-container'>
            {
              this.state.sortByDate 
                ? this.renderSortedComments(data.comments) 
                : this.renderComments(data.formattedComments)
            }
          </div>
        </div>
      </div>
    )
  } 
}