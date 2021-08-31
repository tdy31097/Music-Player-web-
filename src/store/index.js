import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
export default createStore({
  //保存公共数据
  state,
  //修改state中的数据
  mutations,
  //根据一定规则修改state的数据并发送
  getters,
  //异步
  actions,
  //模块划分
  modules:{
    
  }
})
