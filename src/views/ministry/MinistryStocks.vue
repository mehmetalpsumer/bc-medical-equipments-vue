<template>
    <CCard>
        <CCardHeader>
            T.C. Sağlık Bakanlığı Stokları
        </CCardHeader>
        <CCardBody>
            <CRow>
                <CCol lg="12">
                    <!-- Error -->
                    <CAlert v-if="status === 'error'" color="info" closeButton>
                        Maske sayıları getirilirken bir hata oluştu.
                    </CAlert>

                    <!-- Data -->
                    <CWidgetIcon
                            v-if="status === 'success'"
                            :header="maskAmount + ' adet maske'"
                            text="T.C. SAĞLIK BAKANLIĞI STOĞUNDA"
                            color="success"
                    >
                        <CIcon name="cil-settings"/>
                    </CWidgetIcon>

                    <!-- Loading -->
                    <CSpinner v-if="status === 'loading'"></CSpinner>
                </CCol>
            </CRow>
        </CCardBody>

        <!-- Footer -->
        <CCardFooter v-if="fetchDate">
            Son güncelleme tarihi: {{fetchDate}}.
        </CCardFooter>
    </CCard>

</template>

<script>
    export default {
        computed: {
            maskAmount: function() {
                return this.$store.getters["ministryStocks/maskAmount"];
            },
            fetchDate: function() {
                return this.$store.getters["ministryStocks/fetchDate"];
            },
            status: function() {
                return this.$store.getters["ministryStocks/status"];
            },
        },
        methods: {
            getStocks: function() {
                this.$store.dispatch("ministryStocks/fetchStocks")
            }
        },
        mounted() {
            this.getStocks();
        }
    };
</script>
