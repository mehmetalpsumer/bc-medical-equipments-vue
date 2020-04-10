import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const hospital = {
    namespaced: true,
    state: {
        status: '',
        hospitals: [],
    },
    mutations: {
        fetchRequest(state) {
          state.status = 'loading';
        },
        fetchSuccess(state, hospitals) {
            state.status = 'success';
            state.hospitals = hospitals;
        },
        fetchError(state) {
            state.status = 'error';
            state.hospitals = [];
        },
    },
    actions: {
        fetchAll({commit}) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/organizations?group=HOSPITAL', method: 'GET' })
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
        hospitals: state => state.hospitals,
    }
};

export default hospital;
