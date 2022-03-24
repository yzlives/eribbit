import { topCategory } from '@/api/constans'
import { findAllCategory } from '@/api/category'

// 分类模块
export default {
  namespaced: true,
  state () {
    return {
      // 分类信息集合 依赖topcategory重新设置，保证初始化就要数据，不至于白屏

      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类函数
  mutations: {
    // payload 所有分类集合
    setList (state, payload) {
      state.list = payload
    },
    // 定义show和hide函数 控制当前分类的二级分类的显示和隐藏
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getLIst ({ commit }) {
      // 获取分类数据
      const data = await findAllCategory()
      // 给每个分类加深控制二级分类显示隐藏的数据
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分类数据
      commit('setList', data.result)
    }
  }
}
