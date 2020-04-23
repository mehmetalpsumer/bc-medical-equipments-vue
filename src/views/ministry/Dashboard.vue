<template>
    <div>
        <CCard>
            <CCardHeader>
                Submit New Mask Request
            </CCardHeader>
            <CCardBody>
                <CAlert v-if="submitStatus === 'success'" color="success">
                    Request is submitted on {{ submitDate }}.
                </CAlert>

                <CAlert v-if="submitStatus === 'error'" color="danger">
                    An error occurred!
                </CAlert>
                <CRow>
                    <CCol sm="12">
                        <CInput label="Mask Amount" type="number" steps="1" v-model="maskAmount" />
                    </CCol>
                    <CCol sm="12">
                        <CInput label="Bid End Date" type="date" v-model="endDate"></CInput>
                    </CCol>
                    <CCol sm="12">
                        <CInput type="time" v-model="endTime"></CInput>
                    </CCol>
                </CRow>
                <div class="form-actions">
                    <CButton type="button" color="primary" v-on:click="createOrder" :disabled="!canSubmit">
                        <span v-if="submitStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Create Request
                    </CButton>
                </div>
            </CCardBody>
        </CCard>

        <CCard>
            <CCardHeader>Request History</CCardHeader>
            <CCardBody>
                <CDataTable
                        :fields="tableFields"
                        :items="orders"
                        :loading="fetchStatus === 'loading'"
                >
                    <template #open="{item}">
                        <td>
                            <CBadge :color="getOrderStatusBadgeColor(item)">
                                <span v-if="getOrderStatus(item) === 'open'" @click="openModal(item)">{{ getOrderStatusBadge(item) }}</span>
                                <span v-else>{{ getOrderStatusBadge(item) }}</span>
                            </CBadge>
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>

        <!-- Offer select modal -->
        <CModal
                title="Display Offers"
                :show.sync="modalVisible"
                :loading="true"
        >
            <CAlert v-if="acceptStatus === 'error' || offersStatus === 'error'">
                An error occured.
            </CAlert>

            <CAlert color="warning" v-if="offersStatus === 'success' && offers.length === 0">
                There are no offers yet.
            </CAlert>

            <CSpinner v-if="offersStatus === 'loading'"></CSpinner>
            <CRow v-if="offersStatus === 'success'" v-for="offer in offers">
                <CCol lg="3">{{ offer.producer }}</CCol>
                <CCol lg="3">{{ offer.date }}</CCol>
                <CCol lg="3"> {{ offer.offer }}₺</CCol>
                <CCol lg="3">
                    <CButton
                            color="success"
                            @click="acceptOffer(offer.id)"
                            :disabled="acceptStatus === 'loading' || acceptStatus === 'success'">
                        <span v-if="acceptStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Accept Offer
                    </CButton>
                </CCol>
            </CRow>

            <template #footer>
                <CButton color="danger" @click="modalVisible = false">Cancel</CButton>
            </template>
        </CModal>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                maskAmount: 0,
                endDate: new Date().toISOString().slice(0,10),
                endTime : '12:00:00',
                tableFields: ["amount", "date", "open"],
                modalOrderId: '',
                modalVisible: false,
            };
        },
        methods: {
            createOrder: function() {
                const data = {
                    maskAmount: this.maskAmount,
                    endDate: this.endDate + ' ' + this.endTime
                };
                this.$store.dispatch("ministryOrders/createOrder", data).then(() => {
                    this.getOrders();
                });
            },
            getOrders: function() {
                this.$store.dispatch("ministryOrders/getAllOrders");
            },
            getOffers: function(orderId) {
                this.$store.dispatch("offer/getOrderOffers", orderId);
            },
            openModal: function(order) {
                this.modalVisible = true;
                this.modalOrder = order;
                this.getOffers(order.id);
            },
            acceptOffer: function(offerId) {
                this.$store.dispatch("offer/acceptOffer", offerId)
                    .then(() => {
                        this.modalVisible = false;
                        this.modalOrder = null;
                        this.getOrders();
                    });
            },
            getOrderStatus: function(order) {
                if (order['winner']) {
                    return 'deal';
                }

                if (new Date(order['endDate']) < new Date()) {
                    return 'closed';
                }

                return 'open';
            },
            getOrderStatusBadge: function(order) {
                const orderStatus = this.getOrderStatus(order);
                switch(orderStatus) {
                    case 'deal':
                        return 'Completed';
                    case 'closed':
                        return 'Expired';
                    case 'open':
                    default:
                        return 'Open';
                }
            },
            getOrderStatusBadgeColor: function(order) {
                const orderStatus = this.getOrderStatus(order);
                switch(orderStatus) {
                    case 'deal':
                        return 'secondary';
                    case 'closed':
                        return 'warning';
                    case 'open':
                    default:
                        return 'success';
                }
            },
        },
        computed: {
            submitStatus: function() {
                return this.$store.getters["ministryOrders/submitStatus"];
            },
            submitDate: function() {
                return this.$store.getters["ministryOrders/submitDate"];
            },
            canSubmit: function() {
                return this.submitStatus !== 'loading';
            },
            fetchStatus: function() {
                return this.$store.getters["ministryOrders/fetchStatus"];
            },
            fetchDate: function() {
                return this.$store.getters["ministryOrders/fetchDate"];
            },
            orders: function() {
                return this.$store.getters["ministryOrders/orders"].map((order) => {
                    order["open"] = new Date(order.endDate) > new Date();
                    order["date"] = new Date(order.endDate).toLocaleString();
                    return order;
                });
            },
            offers: function() {
                return this.$store.getters["offer/offers"];
            },
            offersStatus: function() {
                return this.$store.getters["offer/offersStatus"];
            },
            acceptStatus: function() {
                return this.$store.getters["offer/acceptStatus"];
            }
        },
        mounted() {
            this.getOrders();
        }
    }
</script>
