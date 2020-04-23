import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const ministryOrders = {
    namespaced: true,
    state: {
        submitDate: null,
        submitStatus: '',
        orders: [],
        fetchStatus: '',
        fetchDate: null
    },
    mutations: {
        submitRequest(state) {
            state.submitStatus = 'loading';
            state.submitDate = null;
        },
        submitSuccess(state) {
            state.submitStatus = 'success';
            state.submitDate = (new Date()).toLocaleString();
        },
        submitError(state) {
            state.submitStatus = 'error';
            state.submitDate = null;
        },
        fetchRequest(state) {
            state.fetchStatus = 'loading';
            state.fetchDate = null;
            state.orders = [];
        },
        fetchSuccess(state, orders) {
            state.fetchStatus = 'success';
            state.fetchDate = (new Date()).toLocaleString();
            state.orders = orders;
        },
        fetchError(state) {
            state.fetchStatus = 'error';
            state.fetchDate = null;
            state.orders = [];
        }
    },
    actions: {
        createOrder({commit}, {maskAmount, endDate}) {
            return new Promise((resolve, reject) => {
                commit('submitRequest');
                const data = { maskAmount, endDate };
                axios({url: backend + '/ministry-orders/', data, method: 'POST' })
                    .then(resp => {
                        commit('submitSuccess', resp.data);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('submitError');
                        reject(err);
                    });
            });
        },
        getCurrentOrders({commit}) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/ministry-orders/', method: 'GET' })
                  .then(resp => {
                      const orders = resp.data;
                      const currentOrders = orders.filter((order) => new Date(order.endDate) < new Date())
                      commit('fetchSuccess', currentOrders);
                      resolve(resp);
                  })
                  .catch(err => {
                      commit('fetchError');
                      reject(err);
                  });
            });
        },
        getAllOrders({commit}) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/ministry-orders/', method: 'GET' })
                  .then(resp => {
                      const orders = resp.data;
                      commit('fetchSuccess', orders);
                      resolve(resp);
                  })
                  .catch(err => {
                      commit('fetchError');
                      reject(err);
                  });
            });
        },
        getUnpaidOrders({commit}) {
            const params = {
                unpaid: true,
            };
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios.get(backend + '/ministry-orders/', {params})
                  .then(resp => {
                      const orders = resp.data.filter(d => d['winner'] != null);
                      commit('fetchSuccess', orders);
                      resolve(resp);
                  })
                  .catch(err => {
                      commit('fetchError');
                      reject(err);
                  });
            });
        }
    },
    getters: {
        submitStatus: state => state.submitStatus,
        submitDate: state => state.submitDate,
        fetchStatus: state => state.fetchStatus,
        fetchDate: state => state.fetchDate,
        orders: state => state.orders,
    }
};

export default ministryOrders;
