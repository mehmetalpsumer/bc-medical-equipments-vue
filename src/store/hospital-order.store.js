import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const hospitalOrder = {
  namespaced: true,
  state: {
    orders: [],
    fetchStatus: '',
    selectedOrder: null,
    selectedOrderStatus: '',
    updateStatus: '',
  },
  mutations: {
    fetchOrdersRequest(state) {
      state.orders = [];
      state.fetchStatus = 'loading';
    },
    fetchOrdersSuccess(state, orders) {
      state.orders = orders;
      state.fetchStatus = 'success';
    },
    fetchOrdersError(state) {
      state.orders = [];
      state.fetchStatus = 'error';
    },
    updateOrdersRequest(state) {
      state.updateStatus = 'loading';
    },
    updateOrdersSuccess(state) {
      state.updateStatus = 'success';
    },
    updateOrdersError(state) {
      state.updateStatus = 'error';
    },
  },
  actions: {
    getAllHospitalOrders({commit}) {
      return new Promise((resolve, reject) => {
        commit('fetchOrdersRequest');
        axios({url: backend + '/hospital-orders/', method: 'GET' })
          .then(resp => {
            commit('fetchOrdersSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchOrdersError');
            reject(err);
          })
      })
    },
    getHospitalOrders({commit}, hospitalId) {
      return new Promise((resolve, reject) => {
        commit('fetchOrdersRequest');
        axios({url: backend + '/hospital-orders/' + hospitalId, method: 'GET' })
          .then(resp => {
            commit('fetchOrdersSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchOrdersError');
            reject(err);
          })
      })
    },
    updateHospitalOrder({commit}, {orderId, status}) {
      const data = {
        order: orderId,
        status
      };

      return new Promise((resolve, reject) => {
        commit('updateOrdersRequest');
        axios({url: backend + '/hospital-orders/', data, method: 'PATCH' })
          .then(resp => {
            commit('updateOrdersSuccess');
            resolve(resp);
          })
          .catch(err => {
            commit('updateOrdersError');
            reject(err);
          })
      })
    }
  },
  getters: {
    orders: state => state.orders,
    fetchStatus: state => state.fetchStatus,
    updateStatus: state => state.updateStatus,
  }
};

export default hospitalOrder;
