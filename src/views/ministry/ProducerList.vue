<template>
    <div>
        <!-- Ministry stocks -->
        <MinistryStocks></MinistryStocks>

        <!-- Producers -->
        <CCard>
            <CCardHeader>
                Producer Stocks
            </CCardHeader>
            <CCardBody>
                <CAlert color="danger" v-if="status === 'error'" closeButton>
                    An error occurred!
                </CAlert>

                <CDataTable
                        :items="producers"
                        :fields="fields"
                        :loading="status === 'loading'"
                        table-filter
                        column-filter
                        hover
                        sorter
                >


                </CDataTable>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
    import MinistryStocks from "./MinistryStocks";

    export default {
        components: {MinistryStocks},
        data: function() {
            return {
                fields: [
                    {key: "id", label: "Producer ID"},
                    {key: "name", label: "Producer Name"},
                    {key: "masks", label: "Masks in Stock"},
                ]
            }
        },
        mounted() {
            this.$store.dispatch("ministryProducers/fetchAll");
        },
        computed: {
            status: function () {
              return this.$store.getters["ministryProducers/status"];
            },
            producers: function () {
              return this.$store.getters["ministryProducers/producers"];
            }
        },
    };
</script>
