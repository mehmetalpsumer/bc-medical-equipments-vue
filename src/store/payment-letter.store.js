import axios from "axios";

const backend = 'http://localhost:7080/api/v1';

const paymentLetter = {
  namespaced: true,
  state: {
    paymentLetters: [],
    fetchStatus: '',
    submitStatus: '',
  },
  mutations: {
    fetchPaymentLettersRequest(state) {
      state.paymentLetters = [];
      state.fetchStatus = 'loading';
    },
    fetchPaymentLettersSuccess(state, paymentLetters) {
      state.paymentLetters = paymentLetters;
      state.fetchStatus = 'success';
    },
    fetchPaymentsError(state) {
      state.paymentLetters = [];
      state.fetchStatus = 'error';
    },
    submitPaymentLetterRequest(state) {
      state.submitStatus = 'loading';
    },
    submitPaymentLetterSuccess(state) {
      state.submitStatus = 'success';
    },
    submitPaymentLetterError(state) {
      state.submitStatus = 'error';
    },
  },
  actions: {
    getAllPaymentLetters({commit}) {
      return new Promise((resolve, reject) => {
        commit('fetchPaymentLettersRequest');
        axios({url: backend + '/payment-letters/', method: 'GET' })
          .then(resp => {
            commit('fetchPaymentLettersSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchPaymentLettersError');
            reject(err);
          })
      })
    },
    getProducerPaymentLetters({commit}, producerId) {
      const params = {
        producer: producerId
      };

      return new Promise((resolve, reject) => {
        commit('fetchPaymentLettersRequest');
        axios.get(backend + '/payment-letters/', {params})
          .then(resp => {
            commit('fetchPaymentLettersSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchPaymentLettersError');
            reject(err);
          })
      })
    },
    getBankPaymentLetters({commit}, bankId) {
      const params = {
        bank: bankId
      };

      return new Promise((resolve, reject) => {
        commit('fetchPaymentLettersRequest');
        axios.get(backend + '/payment-letters/', {params})
          .then(resp => {
            commit('fetchPaymentLettersSuccess', resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit('fetchPaymentLettersError');
            reject(err);
          })
      })
    },
    createPaymentLetter({commit}, {bankId, paymentId}) {
      const data = {
        bank: bankId,
        payment: paymentId
      };

      return new Promise((resolve, reject) => {
        commit('submitPaymentLetterRequest');
        axios({url: backend + '/payment-letters/', data, method: 'POST' })
          .then(resp => {
            commit('submitPaymentLetterSuccess');
            resolve(resp);
          })
          .catch(err => {
            commit('submitPaymentLetterError');
            reject(err);
          })
      })
    },
  },
  getters: {
    paymentLetters: state => state.paymentLetters,
    fetchStatus: state => state.fetchStatus,
    submitStatus: state => state.submitStatus,
  }
};

export default paymentLetter;
