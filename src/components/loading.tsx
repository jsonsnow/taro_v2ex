import { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import React from "react";
import './loading.css'

// eslint-disable-next-line import/no-commonjs
const url = require('../resource/spiner.gif')

class Loading extends Component {
    render () {
        return (<View className='loading'>
            <Image src={url} className='img' />
        </View>)
    }
}

export {Loading}