<template>
    <div>
        <CCard>
            <CCardHeader>
                Ministry of Health Stocks

                <div class="card-header-actions">
                    <CLink href="#" class="card-header-action btn-close" v-on:click="getMinistryStocks">
                        <CIcon name="cil-reload"/>
                    </CLink>
                </div>
            </CCardHeader>
            <CCardBody>
                <CSpinner v-if="ministryStocksStatus === 'loading'"></CSpinner>
                <CWidgetIcon
                        v-if="ministryStocksStatus === 'success'"
                        :header="ministryStocks + ' masks'"
                        text="In Stock"
                        color="primary"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCardBody>
            <CCardFooter v-if="ministryStocksStatus === 'success'">
                Last updated on: {{ ministryStocksDate }}.
            </CCardFooter>
        </CCard>

        <CCard>
            <CCardHeader>
                <CIcon name="cil-pencil"/> New Mask Request
                <div class="card-header-actions">
                    <CLink
                            class="card-header-action btn-minimize"
                            @click="formCollapsed=!formCollapsed"
                    >
                        <CIcon :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"/>
                    </CLink>
                    <CLink href="#" class="card-header-action btn-close" v-on:click="show = !show">
                        <CIcon name="cil-x-circle"/>
                    </CLink>
                </div>
            </CCardHeader>

            <CCollapse :show="formCollapsed">
                <CCardBody>
                    <CAlert color="danger" v-if="orderStatus === 'error'">
                        An error occurred while sending the request!
                    </CAlert>
                    <CAlert color="success" v-if="orderStatus === 'success'">
                        Request is submitted!
                    </CAlert>
                    <CForm @submit="createOrder">
                        <CInput
                                label="Mask amount"
                                description="Enter amount of masks required"
                                type="number"
                                v-model="maskAmountNeeded"
                        />
                        <CInput
                                label="Priority"
                                description="5 being the most urgent, enter between 1-5."
                                type="number"
                                v-model="priority"
                        />
                        <div class="form-actions">
                            <CButton type="submit" color="primary" :disabled="orderStatus === 'loading'">
                                <span v-if="orderStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span>Submit Request</span>
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
                <CCardFooter>
                    <span v-if="orderStatus === 'success'">
                       Last request on: {{ orderDate }}.
                    </span>
                </CCardFooter>
            </CCollapse>
        </CCard>

        <CCard>
            <CCardHeader>Request History</CCardHeader>
            <CCardBody>
                <CAlert color="danger" v-if="pastOrdersStatus === 'error'">
                    An error occurred!
                </CAlert>

                <CDataTable
                    :items="pastOrders"
                    :fields="tableFields"
                    :loading="pastOrdersStatus === 'loading'"
                    sorter
                    table-filter
                    hover>
                    <template #status="{item}">
                        <td>
                            <CBadge :color="getStatus(item.status)[1]">{{ getStatus(item.status)[0] }}</CBadge>
                        </td>
                    </template>

                </CDataTable>
            </CCardBody>
        </CCard>

    </div>
</template>

<script>
    export default {
        name: 'HospitalDashboard',
        data () {
            return {
                show: true,
                formCollapsed: false,
                maskAmountNeeded: 100,
                priority: 3,
                tableFields: [
                    {key: "date", label: "Date"},
                    {key: "amount", label: "Mask Amount"},
                    {key: "urgency", label: "Priority"},
                    {key: "status", label: "Status"},
                ],
            }
        },
        methods: {
            createOrder() {
                const hospitalId = this.$store.getters.user.organization.id;
                const maskAmount = parseInt(this.maskAmountNeeded);
                const priority = parseInt(this.priority);
                this.$store.dispatch("hospital/createOrder", {hospitalId, maskAmount, priority})
                    .then(() => {
                        this.getPastOrders();
                    })
            },
            getPastOrders() {
                const hospitalId = this.$store.getters.user.organization.id;
                this.$store.dispatch("hospital/getPastOrders", {hospitalId})
            },
            getMinistryStocks() {
                this.$store.dispatch("ministryStocks/fetchStocks")
            },
            getStatus(val) {
                if (val == 0) {
                    return ["Waiting", "warning"];
                }

                else if (val == 1) {
                    return ["Processing", "secondary"];
                }

                else if (val == 2) {
                    return ["On Route", "primary"];
                }

                else if (val == 3) {
                    return ["Delivered", "success"];
                }

                return ["Unknown", "danger"]
            }
        },
        computed: {
            orderStatus: function() {
                return this.$store.getters["hospital/orderStatus"];
            },
            orderDate: function () {
                return this.$store.getters["hospital/orderDate"];
            },
            pastOrders: function() {
                return this.$store.getters["hospital/pastOrders"];
            },
            pastOrdersStatus: function() {
                return this.$store.getters["hospital/pastOrdersStatus"];
            },
            ministryStocks: function() {
                return this.$store.getters["ministryStocks/maskAmount"];
            },
            ministryStocksStatus: function() {
                return this.$store.getters["ministryStocks/status"];
            },
            ministryStocksDate: function() {
                return this.$store.getters["ministryStocks/fetchDate"];
            },
        },
        mounted() {
            this.getPastOrders();
            this.getMinistryStocks();
        }
    }
</script>
