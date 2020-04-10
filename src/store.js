import Vue from 'vue'
import Vuex from 'vuex'

import navbar from './store/navbar.store';
import auth from './store/auth.store';
import hospital from './store/hospital.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        navbar,
        auth,
        hospital
    }
});
