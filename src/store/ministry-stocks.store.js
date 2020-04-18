import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const ministryStocks = {
    namespaced: true,
    state: {
        maskAmount: null,
        status: '',
        fetchDate: null,
    },
    mutations: {
        fetchRequest(state) {
          state.status = 'loading';
        },
        fetchSuccess(state, maskAmount) {
            state.status = 'success';
            state.maskAmount = maskAmount;
            state.fetchDate = new Date();
        },
        fetchError(state) {
            state.status = 'error';
            state.maskAmount = null;
            state.fetchDate = null;
        },
    },
    actions: {
        fetchStocks({commit}) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/ministry-masks', method: 'GET' })
                    .then(resp => {
                        commit('fetchSuccess', parseInt(resp.data.masks));
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('fetchError');
                        reject(err);
                    });
            });
        },
    },
    getters: {
        maskAmount: state => state.maskAmount,
        status: state => state.status,
        fetchDate: state => state.fetchDate.toLocaleString(),
    }
};

export default ministryStocks;
