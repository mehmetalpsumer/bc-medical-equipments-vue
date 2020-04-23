import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const delivery = {
  namespaced: true,
  state: {
    deliveries: [],
    fetchStatus: '',
    submitStatus: '',
  },
  mutations: {
    fetchDeliveriesRequest(state) {
      state.deliveries = [];
      state.fetchStatus = 'loading';
    },
    fetchDeliveriesSuccess(state, deliveries) {
      state.deliveries = deliveries;
      state.fetchStatus = 'success';
    },
    fetchDeliveriesError(state) {
      state.deliveries = [];
      state.fetchStatus = 'error';
    },
    submitDeliveryRequest(state) {
      state.submitStatus = 'loading';
    },
    submitDeliverySuccess(state) {
      state.submitStatus = 'success';
    },
    submitDeliveryError(state) {
      state.submitStatus = 'error';
    },
  },
  actions: {
    getAllDeliveries({commit}) {
      return new Promise((resolve, reject) => {
        commit('fetchDeliveriesRequest');
        axios({url: backend + '/deliveries/', method: 'GET' })
          .then(resp => {
            commit('fetchDeliveriesSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchDeliveriesError');
            reject(err);
          })
      })
    },
    getProducerDeliveries({commit}, producerId) {
      const params = {
        producer: producerId
      };

      return new Promise((resolve, reject) => {
        commit('fetchDeliveriesRequest');
        axios.get(backend + '/deliveries/', { params })
          .then(resp => {
            commit('fetchDeliveriesSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchDeliveriesError');
            reject(err);
          })
      })
    },
    updateDelivery({commit}, {deliveryId, status}) {
      const data = {
        delivery: deliveryId,
        status
      };

      return new Promise((resolve, reject) => {
        commit('submitDeliveryRequest');
        axios.patch(backend + '/deliveries/', data)
          .then(resp => {
            commit('submitDeliverySuccess');
            resolve(resp);
          })
          .catch(err => {
            commit('submitDeliveryError');
            reject(err);
          })
      })
    }
  },
  getters: {
    deliveries: state => state.deliveries,
    fetchStatus: state => state.fetchStatus,
    submitStatus: state => state.submitStatus,
  }
};

export default delivery;
