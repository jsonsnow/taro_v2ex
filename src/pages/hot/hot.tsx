import { IThread } from 'src/interfaces/thread'
import { Component } from '@tarojs/taro'
import api from 'src/utils/api'
import { View } from '@tarojs/components'
import { ThreadList } from 'src/components/thread_list'
import React from 'react'

interface IState {
  loading: boolean
  threads: IThread
}

class Hot extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '热门'
  }

  constructor(props) {
    super(props)
    super.constructor(props)
    this.state = {
      loading: true,
      threads: []
    }
  }

  async componentDidMount() {
    try {
      const res = await Taro.request<IThread[]>({ url: api.getHostNodes() })
      this.setState({ threads: res.data, loading: false })
    } catch (error) {
      Taro.showToast({ title: 'Error' })
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

export default Hot
