import React, {Component, Children, PropsWithChildren, ReactChildren, ReactElement} from 'react'
import {Foundation} from 'react-web-vector-icons'
import './Comment.css';
import {calculatePoints, getTimeFromNow} from '../utils/formatter'
import {CommentData} from '../models/CommentData'

interface State {
  deleted: boolean
}

interface Props {
  data: CommentData,
  children?: JSX.Element | JSX.Element[]
}

export class Comment extends Component<Props, State> {

  constructor(props: any) {
    super(props)
    this.state = {
      deleted: false
    }
  }

  render() {
    if (this.state.deleted) {
      return <div/>
    }

    const props = this.props.data
    return (
        <div className="comment-container">
          <div className="comment-header">
            <div className="comment-header-left">
              <a 
                className="username" 
                target={'http://www.reddit.com' + props.permalink} 
                href={'http://www.reddit.com' + props.permalink}
              >
                {props.author}
              </a>
              <div className="score-and-time"> {`${calculatePoints(props.ups, props.downs)} points - ${getTimeFromNow(props.created_utc * 1000)}`}</div>
            </div>
            <div className="delete" onClick={() => this.setState({deleted: true})}>
              <Foundation
                name='trash'
                color='#2C2C2C'
                size={13}
              />
            </div>
          </div>
          <div className="comment-text">{props.body}</div>
          <div className="children">
            {this.props.children}
          </div>
        </div>
    )
  }
}