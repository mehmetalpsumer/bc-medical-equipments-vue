<template>
    <div>
    <CRow>
        <!-- Display stock -->
        <CCol lg="6">
            <CCard>
                <CCardHeader>
                    Display Stocks
                </CCardHeader>
                <CCardBody>
                    <CAlert color="danger" v-if="status === 'error'">
                        Error while fetching mask stocks.
                    </CAlert>
                    <CWidgetIcon
                            v-if="status === 'success'"
                            :header="maskAmount + ' masks'"
                            text="On Stock"
                            color="success"
                    >
                        <CIcon name="cil-settings"/>
                    </CWidgetIcon>
                    <CSpinner v-if="status === 'loading'"></CSpinner>
                </CCardBody>
                <CCardFooter v-if="status === 'success'">
                    Last updated on: {{fetchDate}}.
                </CCardFooter>
            </CCard>
        </CCol>

        <!-- Update stock form -->
        <CCol lg="6">
            <CCard>
                <CCardHeader>
                    Update Stocks
                </CCardHeader>
                <CCardBody>
                    <CAlert v-if="updateStatus === 'success'" color="success" closeButton>
                        Stocks updated.
                    </CAlert>
                    <CAlert v-if="updateStatus === 'error'" color="danger" closeButton>
                        Error while updating stocks!
                    </CAlert>
                    <CForm @submit="updateMasks">
                        <CInput type="number" v-model="newMaskAmount"></CInput>
                        <CButton type="submit" color="primary" :disabled="updateStatus === 'loading'">
                            <span v-if="updateStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Add to Stocks
                        </CButton>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>

    <CRow>
        <!-- Display ministry orders -->
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    Ministry of Health Orders
                </CCardHeader>

                <CCardBody>
                    <CDataTable
                        :fields="ministryOrdersTableFields"
                        :items="ministryOrders"
                        :loading="ministryOrdersFetchStatus === 'loading' || offersFetchStatus === 'loading'"
                    >
                        <template #status="{item}">
                            <td>
                                <CBadge
                                    :color="getOrderStatusBadgeColor(item)">
                                    {{ getOrderStatusBadge(item) }}
                                </CBadge>
                            </td>
                        </template>

                        <template #offer="{item}">
                            <td>
                                <span v-if="getOffer(item)">{{ getOffer(item) }}₺</span>
                                <span v-else>-</span>
                            </td>
                        </template>

                        <template #action="{item}">
                            <td>
                                <CButton
                                        :color="canOffer(item) ? 'primary':'secondary'"
                                        :disabled="!canOffer(item)"
                                        @click="openModal(item)"
                                >
                                    Make Offer
                                </CButton>
                            </td>
                        </template>
                    </CDataTable>
                </CCardBody>

                <CCardFooter v-if="ministryOrdersFetchStatus === 'success'">
                    Last updated on: {{ministryOrdersFetchDate}}.
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>

    <CModal
            title="Make Offer"
            :show.sync="showModal"
    >
        <CAlert v-if="submitStatus === 'error'">
            An error occured!
        </CAlert>

        <CForm @submit="submitOffer">
            <CInput disabled label="Start Date" v-model="modalOrder['openDate']"></CInput>
            <CInput disabled label="End Date" v-model="modalOrder['endDate']"></CInput>
            <CInput disabled label="Mask Amount" v-model="modalOrder['amount']" append="adet"></CInput>
            <CInput type="number" v-model="modalOffer" steps="1" min="1" label="Offer Price" prepend="₺"></CInput>
            <CButton type="submit" color="primary" :disabled="!canSubmitOffer">
                <span v-if="submitStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Submit Offer
            </CButton>
        </CForm>

        <template #footer>
            <CButton color="danger">Cancel</CButton>
        </template>
    </CModal>
    </div>
</template>

<script>
    export default {
        name: 'ProducerDashboard',
        data: function() {
            return {
                showModal: false,
                modalOrder: {
                    openDate: null,
                    endDate: null,
                    amount: null,
                },
                modalOffer: null,
                newMaskAmount: 0,
                ministryOrdersTableFields: [
                    {key: 'amount', label: 'Mask Amount'},
                    {key: 'openDate', label: 'Start Date'},
                    {key: 'endDate', label: 'End Date'},
                    {key: 'status', label: 'Status'},
                    {key: 'offer', label: 'Given Offer'},
                    {key: 'action', label: 'Action'}
                ]
            }
        },
        computed: {
            maskAmount: function () {
                return this.$store.getters["producer/maskAmount"];
            },
            status: function() {
                return this.$store.getters["producer/maskAmountStatus"];
            },
            updateStatus: function () {
                return this.$store.getters["producer/updateStatus"];
            },
            fetchDate: function() {
                return this.$store.getters["producer/fetchDate"];
            },
            ministryOrders: function() {
                return this.$store.getters["ministryOrders/orders"];
            },
            ministryOrdersFetchStatus: function() {
                return this.$store.getters["ministryOrders/fetchStatus"];
            },
            ministryOrdersFetchDate: function() {
                return this.$store.getters["ministryOrders/fetchDate"];
            },
            offers: function() {
                return this.$store.getters["offer/offers"];
            },
            offersFetchStatus: function() {
                return this.$store.getters["offer/offersStatus"];
            },
            submitStatus: function() {
                return this.$store.getters["offer/submitStatus"];
            },
            canSubmitOffer: function() {
                return this.submitStatus !== 'loading' && this.modalOffer;
            }
        },
        methods: {
            updateMasks: function() {
                const producerId = this.$store.getters.user.organization.id;
                const maskAmount = this.newMaskAmount;
                this.$store.dispatch("producer/updateMaskAmount", {producerId, maskAmount})
                    .then(() => {
                        this.$store.dispatch("producer/getMaskAmount", producerId);
                    });
            },
            getMaskAmount: function() {
                const producerId = this.$store.getters.user.organization.id;
                this.$store.dispatch("producer/getMaskAmount", producerId);
            },
            getOffers: function() {
                const producerId = this.$store.getters.user.organization.id;
                this.$store.dispatch("offer/getProducerOffers", producerId);
            },
            getMinistryOrders: function() {
                this.$store.dispatch("ministryOrders/getAllOrders");
                this.getOffers();
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
            getOffer: function(order) {
                const offer = this.offers.find(x => x.order === order.id);

                if (!offer) {
                    return null;
                }

                return offer['offer'];
            },
            canOffer: function(order) {
                return !(this.getOrderStatus(order) !== 'open' || this.getOffer(order) != null);
            },
            openModal: function(order) {
                console.log(order);
                this.modalOrder = order;
                this.showModal = true;
            },
            submitOffer: function() {
                const orderId = this.modalOrder['id'];
                const offer = this.modalOffer;
                const producerId = this.$store.getters.user.organization.id;
                this.$store.dispatch('offer/makeOffer', {producerId, orderId, offer})
                    .then(() => {
                        if (this.submitStatus === 'success') {
                            this.showModal = false;
                            this.getMinistryOrders();
                        }
                    });
            }
        },
        mounted() {
            this.getMaskAmount();
            this.getMinistryOrders();
        }
    }
</script>
