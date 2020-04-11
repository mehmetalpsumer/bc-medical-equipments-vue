<template>
    <CRow>
        <CCol lg="6">
            <h4>Stok Görüntüleme</h4>
            <CAlert v-if="status === 'success'" color="info" closeButton>
                Son güncelleme tarihi: {{fetchDate}}.
            </CAlert>
            <CWidgetIcon
                    v-if="status === 'success'"
                    :header="maskAmount + ' adet maske'"
                    text="Stokta"
                    color="success"
            >
                <CIcon name="cil-settings"/>
            </CWidgetIcon>
            <CSpinner v-if="status === 'loading'"></CSpinner>
            <p v-if="status === 'error'">Maske sayıları getirilirken bir hata oluştu.</p>
        </CCol>

        <CCol lg="6">
            <h4>Stok Güncelleme</h4>
            <CAlert v-if="updateStatus === 'success'" color="success" closeButton>
                Stok güncellendi.
            </CAlert>
            <CAlert v-if="updateStatus === 'error'" color="danger" closeButton>
                Stok güncellenirken bir hata oluştu.
            </CAlert>
            <CForm @submit="updateMasks">
                <CInput type="number" v-model="newMaskAmount"></CInput>
                <CButton type="submit" color="primary" :disabled="updateStatus === 'loading'">
                    <span v-if="updateStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Güncelle
                </CButton>
            </CForm>
        </CCol>
    </CRow>
</template>

<script>
    export default {
        name: 'ProducerDashboard',
        data: function() {
            return {
                newMaskAmount: 0,
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
          }
        },
        mounted() {
            const producerId = this.$store.getters.user.organization.id;
            this.$store.dispatch("producer/getMaskAmount", producerId);
        }
    }
</script>
