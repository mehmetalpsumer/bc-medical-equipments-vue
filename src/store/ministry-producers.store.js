import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const ministryProducers = {
    namespaced: true,
    state: {
        status: '',
        producers: [],
    },
    mutations: {
        fetchRequest(state) {
            state.status = 'loading';
        },
        fetchSuccess(state, producers) {
            state.status = 'success';
            state.producers = producers;
        },
        fetchError(state) {
            state.status = 'error';
            state.producers = [];
        },
    },
    actions: {
        fetchAll({commit}) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/producer-masks/', method: 'GET' })
                    .then(resp => {
                        commit('fetchSuccess', resp.data);
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
        producers: state => state.producers.map((producer) => {
            return {
                name: producer.producer.name,
                id: producer.producer.id,
                masks: producer.masks
            }
        }),
        status: state => state.status,
    }
};

export default ministryProducers;
