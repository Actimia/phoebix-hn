import Vue from 'vue'
import Vuex from 'vuex'

import { get } from '~/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frontpage: [],
    items: {},
  },
  mutations: {
    updateFrontpage (store, frontpage) {
      store.frontpage = frontpage
    },
    updateItem (store, item) {
      Vue.set(store.items, item.id, item)
    }
  },
  actions: {
    async updateFrontpage ({ commit }) {
      const frontpage = await get('topstories')
      commit('updateFrontpage', frontpage)
    },

    async getItem ({ commit }, id) {
      const item = await get('item/' + id)
      commit('updateItem', item)
    }
  },
  modules: {
  }
})
