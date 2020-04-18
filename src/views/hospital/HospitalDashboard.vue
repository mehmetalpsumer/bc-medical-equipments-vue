<template>
    <div>
        <CRow>
            <CCol sm="12" md="4">
                <CWidgetIcon
                        header="-"
                        text="Stokta"
                        color="primary"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol sm="12" md="4">
                <CWidgetIcon
                        header="-"
                        text="TESLİM EDİLDİ"
                        color="success"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol sm="12" md="4">
                <CWidgetIcon
                        header="-"
                        text="BEKLENİYOR"
                        color="warning"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
        </CRow>

        <CCard>
            <CCardHeader>
                <CIcon name="cil-pencil"/> Yeni Maske Talebi Oluştur
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
                    <CForm @submit="createOrder">
                        <CInput
                                label="Maske adedi"
                                description="Gerekli olan maske miktarını girin"
                                type="number"
                                append="adet"
                                v-model="maskAmountNeeded"
                        />
                        <CInput
                                label="Aciliyet Durumu"
                                description="5 en acil olmak üzere, 1 ile 5 arasında aciliyet durumunu girin."
                                type="number"
                                append="adet"
                                v-model="priority"
                        />
                        <div class="form-actions">
                            <CButton type="submit" color="primary" :disabled="orderStatus === 'loading'">
                                <span v-if="orderStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span>Talebi Gönder</span>
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
                <CCardFooter>
                                <span v-if="orderStatus === 'success'">
                                    Son talep tarihi: {{ orderDate }}.
                                </span>
                </CCardFooter>
            </CCollapse>
        </CCard>

        <CCard>
            <CCardHeader>Geçmiş Talepler</CCardHeader>
            <CCardBody>
                <CDataTable
                        :items="pastOrders"
                        :fields="tableFields"
                        :loading="pastOrdersStatus === 'loading'">

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
                tableFields: ["masks", "urgency"],
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
            }
        },
        mounted() {
            this.getPastOrders();
        }
    }
</script>
