<template>
    <div>
        <CCard>
            <CCardHeader>
                Yeni Maske Talebi Oluştur
            </CCardHeader>
            <CCardBody>
                <CAlert v-if="submitStatus === 'success'" color="success">
                    Yeni talep {{ submitDate }} tarihinde oluşturuldu.
                </CAlert>

                <CAlert v-if="submitStatus === 'error'" color="danger">
                    Beklenmedik bir hata oluştu.
                </CAlert>
                <CRow>
                    <CCol sm="12">
                        <CInput label="Maske Sayısı" type="number" steps="1" v-model="maskAmount" />
                    </CCol>
                    <CCol sm="12">
                        <CInput label="Son Teklif Tarihi" type="date" v-model="endDate"></CInput>
                    </CCol>
                </CRow>
                <div class="form-actions">
                    <CButton type="button" color="primary" v-on:click="createOrder" :disabled="!canSubmit">
                        <span v-if="submitStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Talep Oluştur
                    </CButton>
                </div>
            </CCardBody>
        </CCard>

        <CCard>
            <CCardHeader>Talepler</CCardHeader>
            <CCardBody>
                <CDataTable
                        :fields="tableFields"
                        :items="orders"
                        :loading="fetchStatus === 'loading'"
                >
                    <template #open="{item}">
                        <td>
                            <CBadge :color="item.open ? 'success' : 'danger'">
                                {{ item.open ? 'Açık' : 'Kapalı' }}
                            </CBadge>
                        </td>
                    </template>
                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
              maskAmount: 0,
              endDate: new Date().toISOString().slice(0,10),
                tableFields: ["amount", "date", "open"]
            };
        },
        methods: {
            createOrder: function() {
                const data = {
                    maskAmount: this.maskAmount,
                    endDate: this.endDate
                };
                this.$store.dispatch("ministryOrders/createOrder", data);
            },
            getOrders: function() {
                this.$store.dispatch("ministryOrders/getAllOrders");
            }
        },
        computed: {
            submitStatus: function() {
                return this.$store.getters["ministryOrders/submitStatus"];
            },
            submitDate: function() {
                return this.$store.getters["ministryOrders/submitDate"];
            },
            canSubmit: function() {
                return this.submitStatus === 'success' || this.submitStatus === '';
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
        },
        mounted() {
            this.getOrders();
        }
    }
</script>
