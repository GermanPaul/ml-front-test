import Vue from 'vue'
import Vuex from 'vuex'
import { MlApi } from '@/api/mlApi.js'

const mlApi = new MlApi();

Vue.use(Vuex)

const state = {
  itemQuery: '',
  itemQueryResult: [],
  itemQueryCategories: '',
  loadingQuery: true,
  detailsResult: {
    id: '',
    title: '',
    price: {
      currency: '',
      amount: 0,
    },
    picture: '',
    condition: '',
    free_shipping: false,
    sold_quantity: 0,
    description: '',
    categories: []
  },
  loadingDetails: true
};

const getters = {
  getItemQuery(state) {
    return state.itemQuery;
  },
  getItemQueryResult(state) {
    return state.itemQueryResult;
  },
  getItemQueryCategories(state) {
    return state.itemQueryCategories;
  },
  getLoadingQuery(state) {
    return state.loadingQuery;
  },
  getDetailsResult(state) {
    return state.detailsResult;
  },
  getLoadingDetails(state) {
    return state.loadingDetails;
  }
};

const mutations = {
  setItemQuery(state, payload) {
    state.itemQuery = payload;
  },
  setItemQueryResult(state, payloas) {
    state.itemQueryResult = payloas;
  },
  setItemQueryCategories(state, payloas) {
    state.itemQueryCategories = payloas;
  },
  setLoadingQuery(state, payload) {
    state.loadingQuery = payload;
  },
  setDetailsResult(state, payload) {
    state.detailsResult = payload;
  },
  setLoadingDetails(state, payload) {
    state.loadingDetails = payload;
  }
};

const actions = {
  updateItemQuery({ commit }, payload) {
    commit('setItemQuery', payload);
  },
  updateItemQueryResult({ commit }, payload) {
    commit('setLoadingQuery', true);
    commit('setItemQuery', payload);
    mlApi.getItems(payload).then(res => {
      commit('setItemQueryResult', res.data.items);
      commit('setItemQueryCategories', res.data.categories);
    }).catch(error => {
      console.error(error);
      commit('setItemQueryResult', []);
      commit('setItemQueryCategories', []);
    }).finally(() => {
      commit('setLoadingQuery', false);
    })
  },
  updateDetailsResult({ commit }, payload) {
    commit('setLoadingDetails', true);
    mlApi.getItemInfo(payload).then(res => {
      commit('setDetailsResult', res.data.item);
    }).catch(error => {
      console.error(error);
      commit('setDetailsResult', 
        {
          id: '',
          title: '',
          price: {
            currency: '',
            amount: 0,
          },
          picture: '',
          condition: '',
          free_shipping: false,
          sold_quantity: 0,
          description: ''
        }
      )
    }).finally(() => {
      commit('setLoadingDetails', false);
    })
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
