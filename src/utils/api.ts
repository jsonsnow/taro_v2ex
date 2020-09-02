const HOST_URI = 'https://www.v2ex.com/api/'
const ALL_NODE = 'nodes/all.json'
const NODE_INFO = 'nodes/show.json'
const LATEST_TOPIC = 'topics/latest.json'
const HOT_TOPIC = 'topics/hot.json'
//获取主题信息 ：id | (:username | :node_id | : node_name)
const GET_TOPICS = 'topics/show.json'
const GET_REPLIES = 'replies/show.json'
// 获取用户信息
const GET_USERINFO = 'members/show.json'

function queryString(obj?: Object): String {
  if (!obj) {
    return ''
  }
  return (
    '?' +
    Object.keys(obj)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
      })
      .join('&')
  )
}

function getAllNode(): String {
  return HOST_URI + ALL_NODE
}

function getNodeInfo(o?: Object): String {
  return HOST_URI + NODE_INFO + queryString(o)
}

function getHostNodes(): string {
  return HOST_URI + HOT_TOPIC
}

function getLatestTopic(o?: Object): String {
  return HOST_URI + LATEST_TOPIC + queryString(o)
}

function getReplies(o?: Object): String {
  return HOST_URI + GET_REPLIES + queryString(o)
}

function getTopics(o?: Object): String {
  return HOST_URI + GET_TOPICS + queryString(o)
}

export default {
  getAllNode,
  getNodeInfo,
  getLatestTopic,
  getReplies,
  getHostNodes,
  queryString,
  getTopics
}
