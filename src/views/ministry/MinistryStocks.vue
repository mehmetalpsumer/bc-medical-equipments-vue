<template>
    <CCard>
        <CCardHeader>
            Health of Ministry Stocks
        </CCardHeader>
        <CCardBody>
            <CRow>
                <CCol lg="12">
                    <!-- Error -->
                    <CAlert v-if="status === 'error'" color="info" closeButton>
                        An error occurred.
                    </CAlert>

                    <!-- Data -->
                    <CWidgetIcon
                            v-if="status === 'success'"
                            :header="maskAmount + ' masks'"
                            text="In Ministry Stocks"
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
            Last updated on: {{fetchDate}}.
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
