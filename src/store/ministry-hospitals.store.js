import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const ministryHospitals = {
    namespaced: true,
    state: {
        status: '',
        hospitals: [],
        fetchDate: null,
    },
    mutations: {
        fetchRequest(state) {
          state.status = 'loading';
        },
        fetchSuccess(state, hospitals) {
            state.status = 'success';
            state.hospitals = hospitals;
            state.fetchDate = new Date();
        },
        fetchError(state) {
            state.status = 'error';
            state.hospitals = [];
            state.fetchDate = null;
        },
    },
    actions: {
        fetchAll({commit}) {
            return new Promise((resolve, reject) => {
                commit('fetchRequest');
                axios({url: backend + '/hospital-orders', method: 'GET' })
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
        hospitals: state => state.hospitals.map((hospital) => {
            hospital.total = hospital.orders
              .filter(a => a.status == 0)
              .reduce((a, b) => a + (b['amount'] || 0), 0);
            return hospital;
        }),
        status: state => state.status,
        fetchDate: state => state.fetchDate.toLocaleString(),
    }
};

export default ministryHospitals;
