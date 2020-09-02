import React from 'react'
import { View } from '@tarojs/components'
import { Component } from '@tarojs/taro'
import { IMember } from 'src/interfaces/member'
import { INode } from 'src/interfaces/node'
import { Thread } from 'src/components/thread'
import { Loading } from './loading'

interface IProps {
  threads: IThread[]
  loading: boolean
}

interface IThread {
  title: string
  member: IMember
  node: INode
  last_modified: number
  id: number
  replies: number
  key?: number
}
class ThreadList extends Component<IProps, {}> {
  static defaultProps = {
    threads: [],
    loading: true
  }
  render() {
    const { loading, threads } = this.props
    if (loading) {
      return <Loading />
    }
    const element = threads.map((thread, index) => {
      return (
        <Thread
          key={thread.id}
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
        />
      )
    })
    return <View className="thread-list">{element}</View>
  }
}

export { ThreadList }
