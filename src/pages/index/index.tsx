/* eslint-disable react/no-unused-state */
import Taro from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import { ThreadList } from 'src/components/thread_list'
import { IThread } from 'src/interfaces/thread'
import api from 'src/utils/api'

interface IState {
  loading: boolean
  threads: IThread[]
}

class Index extends React.Component<{}, IState> {
  async componentDidMount() {
    try {
      const res = await Taro.request<IThread[]>({ url: api.getLatestTopic() })
      this.setState({
        threads: res.data,
        loading: false
      })
    } catch (error) {
      Taro.showToast({ title: '载入远程数据错误' })
    }
  }

  render() {
    const { loading, threads } = this.state
    return (
      <View className="index">
        <ThreadList threads={threads} loading={loading} />
      </View>
    )
  }
}

export default Index
