/**
 * 菜单|权限列表
 */

const state = {
  menuList: []
}

const getters = {
  menu: (state) => state.menuList
}

const mutations = {
  setMenuList(state, list) {
    state.menuList = list
  }
}

const actions = {
  setMenuList({commit}, e) {
    commit('setMenuList', e)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}