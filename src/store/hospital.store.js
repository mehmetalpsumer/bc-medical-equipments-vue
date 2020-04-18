import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const hospital = {
    namespaced: true,
    state: {
        orderStatus: '',
        orderDate: null,
        pastOrders: [],
        pastOrdersStatus: '',
    },
    mutations: {
        orderRequest(state) {
            state.orderStatus = 'loading';
        },
        orderSuccess(state) {
            state.orderStatus = 'success';
            state.orderDate = new Date();
        },
        orderError(state) {
            state.orderStatus = 'error';
            state.orderDate = null;
        },
        pastOrdersRequest(state) {
            state.pastOrders = [];
            state.pastOrdersStatus = 'loading';
        },
        pastOrdersSuccess(state, orders) {
            state.pastOrders = orders;
            state.pastOrdersStatus = 'success';
        },
        pastOrdersError(state) {
            state.pastOrders = [];
            state.pastOrdersStatus = 'error';
        },
    },
    actions: {
        createOrder({commit}, {hospitalId, maskAmount, priority}) {
            const data = {
              masks: parseInt(maskAmount),
              urgency: parseInt(priority),
            };
            return new Promise((resolve, reject) => {
                commit('orderRequest');
                axios({url: backend + '/hospital-orders/' + hospitalId, data: data, method: 'POST' })
                    .then(resp => {
                        commit('orderSuccess', maskAmount);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('orderError');
                        reject(err);
                    })
            })
        },
        getPastOrders({commit}, {hospitalId}) {
            return new Promise((resolve, reject) => {
                commit('pastOrdersRequest');
                axios({url: backend + '/hospital-orders/' + hospitalId, method: 'GET' })
                  .then(resp => {
                      commit('pastOrdersSuccess', resp.data.orders);
                      resolve(resp);
                  })
                  .catch(err => {
                      commit('pastOrdersError');
                      reject(err);
                  })
            })
        },
    },
    getters: {
        orderStatus: state => state.orderStatus,
        orderDate: state => state.orderDate.toLocaleString(),
        pastOrders: state => state.pastOrders,
        pastOrdersStatus: state => state.pastOrdersStatus
    }
};

export default hospital;
