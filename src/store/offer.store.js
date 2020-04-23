import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const offer = {
  namespaced: true,
  state: {
    offers: [],
    offersStatus: '',
    offersDate: null,
    submitStatus: '',
    submitDate: null,
    acceptStatus: '',
  },
  mutations: {
    clearOffers(state) {
      state.offers = [];
      state.offerStatus = '';
      state.offersDate = null;
    },
    offersFetchRequest(state) {
      state.offersStatus = 'loading';
      state.offersDate = null;
      state.offers = [];
    },
    offersFetchSuccess(state, offers) {
      state.offersStatus = 'success';
      state.offersDate = new Date();
      state.offers = offers;
    },
    offersFetchError(state) {
      state.offersStatus = 'error';
      state.offersDate = null;
      state.offers = [];
    },
    submitRequest(state) {
      state.submitStatus = 'loading';
      state.submitDate = null;
    },
    submitSuccess(state) {
      state.submitStatus = 'success';
      state.submitDate = new Date();
    },
    submitError(state) {
      state.submitStatus = 'error';
      state.submitDate = null;
    },
    acceptRequest(state) {
      state.acceptStatus = 'loading';
    },
    acceptSuccess(state) {
      state.acceptStatus = 'success';
    },
    acceptError(state) {
      state.acceptStatus = 'error';
    },
  },
  actions: {
    clearOffers({commit}) {
      commit('clearOffers');
    },
    getProducerOffers({commit}, producerId) {
      return new Promise((resolve, reject) => {
        const queryParams = {
          producer: producerId
        };
        const url = backend + '/offers/';
        commit('offersFetchRequest');
        axios.get(url, {params: queryParams} )
          .then(resp => {
            const offers = resp.data;
            commit('offersFetchSuccess', offers);
            resolve(resp);
          })
          .catch(err => {
            commit('offersFetchErrors');
            reject(err);
          })
      })
    },
    getOrderOffers({commit}, orderId) {
      return new Promise((resolve, reject) => {
        const queryParams = {
          order: orderId
        };
        const url = backend + '/offers/';
        commit('offersFetchRequest');
        axios.get(url, {params: queryParams} )
          .then(resp => {
            const offers = resp.data;
            commit('offersFetchSuccess', offers);
            resolve(resp);
          })
          .catch(err => {
            commit('offersFetchErrors');
            reject(err);
          })
      })
    },
    makeOffer({commit}, {producerId, orderId, offer}) {
      return new Promise((resolve, reject) => {
        const data = {
          producer: producerId,
          offer: offer,
          order: orderId
        };

        const url = backend + '/offers/';
        commit('submitRequest');
        axios.post(url, data)
          .then(resp => {
            commit('submitSuccess');
            resolve(resp);
          })
          .catch(err => {
            commit('submitError');
            reject(err);
          })
      })
    },
    acceptOffer({commit}, offerId) {
      return new Promise((resolve, reject) => {

        const url = backend + '/offers/' + offerId;
        commit('submitRequest');
        axios.post(url)
          .then(resp => {
            commit('submitSuccess');
            resolve(resp);
          })
          .catch(err => {
            commit('submitError');
            reject(err);
          })
      })
    },
  },
  getters: {
    offers: state => state.offers,
    offersStatus: state => state.offersStatus,
    offersDate: state => state.offersDate,
    submitStatus: state => state.submitStatus,
    submitDate: state => state.submitDate,
    acceptStatus: state => state.acceptStatus,
  }
};

export default offer;
