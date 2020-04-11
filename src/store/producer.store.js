import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const producer = {
    namespaced: true,
    state: {
        maskAmount: null,
        fetchDate: null,
        maskAmountNew: 0,
        maskAmountStatus: '',
        updateStatus: '',
    },
    mutations: {
        fetchRequest(state) {
            state.maskAmountStatus = 'loading';
            state.maskAmount = null;
        },
        fetchSuccess(state, maskAmount) {
            state.maskAmountStatus = 'success';
            state.maskAmount = maskAmount;
            state.fetchDate = new Date();
        },
        fetchError(state) {
            state.maskAmountStatus = 'error';
            state.maskAmount = null;
        },
        updateRequest(state) {
            state.updateStatus = 'loading';
        },
        updateSuccess(state) {
            state.updateStatus = 'success';
        },
        updateError(state) {
            state.updateStatus = 'error';
        }
    },
    actions: {
        getMaskAmount({commit}, producerId) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/producer-masks/' + producerId, method: 'GET' })
                    .then(resp => {
                        const maskAmount = resp.data.masks;
                        commit('fetchSuccess', maskAmount);
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('fetchError');
                        reject(err);
                    })
            })
        },
        updateMaskAmount({commit}, {producerId, maskAmount}) {
            return new Promise((resolve, reject) => {
                commit('updateRequest');
                const data = {
                  masks: parseInt(maskAmount),
                };
                console.log(data);
                axios({url: backend + '/producer-masks/' + producerId, data: data, method: 'PUT' })
                    .then(resp => {
                        commit('updateSuccess');
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('updateError');
                        reject(err);
                    })
            })
        }
    },
    getters: {
        maskAmount: state => state.maskAmount,
        maskAmountStatus: state => state.maskAmountStatus,
        updateStatus: state => state.updateStatus,
        fetchDate: state => state.fetchDate.toLocaleString(),
    }
};

export default producer;
