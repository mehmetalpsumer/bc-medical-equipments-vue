import Vue from 'vue'
import Vuex from 'vuex'

import navbar from './store/navbar.store';
import auth from './store/auth.store';
import ministryHospitals from './store/ministry-hospitals.store';
import producer from './store/producer.store';
import ministryProducers from './store/ministry-producers.store';
import ministryStocks from './store/ministry-stocks.store';
import ministryOrders from './store/ministry-orders.store';
import hospital from './store/hospital.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        navbar,
        auth,
        ministryHospitals,
        producer,
        ministryProducers,
        ministryStocks,
        ministryOrders,
        hospital,
    }
});
