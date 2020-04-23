import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const payment = {
  namespaced: true,
  state: {
    payments: [],
    fetchStatus: '',
    submitStatus: '',
  },
  mutations: {
    fetchPaymentsRequest(state) {
      state.payments = [];
      state.fetchStatus = 'loading';
    },
    fetchPaymentsSuccess(state, payments) {
      state.payments = payments;
      state.fetchStatus = 'success';
    },
    fetchPaymentsError(state) {
      state.payments = [];
      state.fetchStatus = 'error';
    },
    submitPaymentRequest(state) {
      state.submitStatus = 'loading';
    },
    submitPaymentSuccess(state) {
      state.submitStatus = 'success';
    },
    submitPaymentError(state) {
      state.submitStatus = 'error';
    },
  },
  actions: {
    getAllPayments({commit}) {
      return new Promise((resolve, reject) => {
        commit('fetchPaymentsRequest');
        axios({url: backend + '/payments/', method: 'GET' })
          .then(resp => {
            commit('fetchPaymentsSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchPaymentsError');
            reject(err);
          })
      })
    },
    createPayment({commit}, {orderId, price, producerId}) {
      const data = {
        order: orderId,
        price,
        producer: producerId
      };

      return new Promise((resolve, reject) => {
        commit('submitPaymentRequest');
        axios({url: backend + '/payments/', data, method: 'POST' })
          .then(resp => {
            commit('submitPaymentSuccess');
            resolve(resp);
          })
          .catch(err => {
            commit('submitPaymentError');
            reject(err);
          })
      })
    },
    getPaymentsWithoutLetter({commit}) {
      const params = {
        unpaid: true
      };

      return new Promise((resolve, reject) => {
        commit('fetchPaymentsRequest');
        axios.get(backend + '/payments/', { params })
          .then(resp => {
            commit('fetchPaymentsSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchPaymentsError');
            reject(err);
          })
      })
    }
  },
  getters: {
    payments: state => state.payments,
    fetchStatus: state => state.fetchStatus,
    submitStatus: state => state.submitStatus,
  }
};

export default payment;
