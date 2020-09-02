import { IThread } from 'src/interfaces/thread'
import { IThreadProps, GlobalState, timeagoInst } from 'src/utils'
import React, { Component } from 'react'
import api from 'src/utils/api'
import { View, Image, RichText } from '@tarojs/components'
import { Loading } from 'src/components/loading'
import { Thread } from 'src/components/thread'
import './index.css'

interface IState {
  loading: boolean
  replies: IThread[]
  content: string
  thread: IThreadProps
}

function prettyHTML(str: string) {
  const lines = ['p', 'h1', 'h3', 'h3', 'h4', 'h5', 'h6']
  lines.forEach((line) => {
    const regex = new RegExp(`<${line}`, 'gi')
    str = str.replace(regex, `<${line} class="line"`)
  })
  return str.replace(/<img/gi, '<img class="img"')
}

class ThreadDetail extends Component<{}, IState> {
  state = {
    loading: true,
    replies: [],
    content: '',
    thread: {} as IThreadProps
  } as IState

  config = {
    navigationBarTitleText: '话题'
  }

  componentWillMount() {
    this.setState({ thread: GlobalState.thread })
  }

  async componentDidMount() {
    try {
      const id = GlobalState.thread.tid
      const [
        { data },
        {
          data: [{ content_rendered }]
        }
      ] = await Promise.all([
        Taro.request<IThread>({
          url: api.getReplies({ topic_id: id })
        }),
        Taro.request<IThread[]>({ url: api.getTopics({ id }) })
      ])
      this.setState({
        loading: false,
        replies: data,
        content: prettyHTML(content_rendered)
      })
    } catch (error) {
      Taro.showToast({ title: '载入数据错误' })
    }
  }

  render() {
    const { loading, replies, thread, content } = this.state
    const replieEl = replies.map((reply, index) => {
      const time = timeagoInst.format(reply.last_modified * 1000, 'zh')
      return (
        <View className="reply" key={reply.id}>
          <Image src={reply.member.avatar_large} />
          <View className="main">
            <View className="author">{reply.member.username}</View>
            <View className="time">{time}</View>
            {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? (
              <View className="content">{reply.content}</View>
            ) : (
              <RichText nodes={reply.content} className="content" />
            )}
            <View className="floor">{index + 1} 楼</View>
          </View>
        </View>
      )
    })
    const contentEl = loading ? (
      <Loading />
    ) : (
      <View>
        <View className="main-content">
          {Taro.getEnv() === Taro.ENV_TYPE.ALIPAY ? (
            <View>{content}</View>
          ) : (
            <View className="replies">{replieEl}</View>
          )}
        </View>
      </View>
    )

    return (
      <View className="detail">
        <Thread
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
          not_navi={true}
        />
        {contentEl}
      </View>
    )
  }
}

export default ThreadDetail
