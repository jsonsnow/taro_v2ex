/* eslint-disable react/no-unused-state */
import Taro from '@tarojs/taro'
import React from 'react'
import {View} from '@tarojs/components'

class Index extends React.Component {
  state = {
    loading: true,
    threads:[]
  }

  async componentDidMount () {
    try {
      const res = await Taro.request({url: ""})
      this.setState({
        threads: res.data,
        loading: false
      })
    } catch (error) {
      Taro.showToast({title:'载入远程数据错误'})
    }
  }

  render() {
    const {loading, threads} = this.state
    return (<View className='index'>
      <ThreadList>
      </ThreadList>
    </View>)
  }
}

export default Index