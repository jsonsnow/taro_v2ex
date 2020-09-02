import { View, Image, Text } from '@tarojs/components'
import React from 'react'
import { IMember } from 'src/interfaces/member'
import { INode } from 'src/interfaces/node'
import { Component, eventCenter } from '@tarojs/taro'
import { timeagoInst, Thread_DETAIL_NAVIGATE } from '../utils'

import './thread.css'

interface IProps {
  title: string
  member: IMember
  node: INode
  last_modified: number
  tid: number
  replies: number
  key?: number
  not_navi?: boolean
}

class Thread extends Component<IProps, {}> {
  handleNavigate = () => {
    const { not_navi } = this.props
    if (not_navi) {
      return
    }
    //eventCenter.trigger(thread_de)
    Taro.navigateTo({ url: '/pages/thread_detail/thread_detail' })
  }
  render() {
    const { title, member, last_modified, replies, node, not_navi } = this.props
    const time = timeagoInst.format(last_modified * 1000, 'zh')
    const usernameCls = `author ${not_navi ? 'bold' : ''}`
    return (
      <View className="thread" onClick={this.handleNavigate}>
        <View className="info">
          <View>
            <Image src={member.avatar_large} />
          </View>
          <View className="middle">
            <View className={usernameCls}>{member.username}</View>
            <View className="replies">
              <Text className="mr10">{time}</Text>
              <Text>评论 {replies}</Text>
            </View>
          </View>
          <View className="node">
            <Text className="tag">{node.title}</Text>
          </View>
        </View>
        <Text className="title">{title}</Text>
      </View>
    )
  }
}

export { Thread }
