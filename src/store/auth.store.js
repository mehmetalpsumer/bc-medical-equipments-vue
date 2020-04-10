import axios from 'axios';

const backend = 'http://localhost:7080/api/v1';

const auth = {
    state: {
        status: '',
        user: null,
        token: null,
    },
    mutations: {
        authRequest(state) {
            state.status = 'loading';
        },
        authSuccess(state, {token, userObj}) {
            state.status = 'success';
            state.token = token;
            state.user = userObj;
        },
        authError(state) {
            state.status = 'error';
        },
        logout(state) {
            state.status = '';
            state.user = {};
            state.token = '';
        }
    },
    actions: {
        login({commit}, user)  {
            return new Promise((resolve, reject) => {
                commit('authRequest');
                axios({url: backend + '/token-auth', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token;
                        localStorage.setItem('token', token);
                        axios.defaults.headers.common['Authorization'] = token;

                        // Parse JSON payload
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                        }).join(''));
                        const userObj = JSON.parse(jsonPayload);
                        console.log(userObj)
                        commit('authSuccess', {token, userObj});
                        resolve(resp);
                    })
                    .catch(err => {
                        commit('authError');
                        localStorage.removeItem('token');
                        reject(err);
                    })
            })
        },
        logout({commit}){
            return new Promise((resolve) => {
                commit('logout');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                resolve();
            });
        }
    },
    getters: {
        status: state => state.status,
        user: state => state.user,
        isLoggedIn: state => !!state.token,
        group: state => state.user.organization.group,
    }
};

export default auth;
