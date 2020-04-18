<template>
    <div>
        <!-- Ministry stocks -->
        <MinistryStocks></MinistryStocks>

        <!-- Producers -->
        <CCard>
            <CCardHeader>
                Üretici Stokları
            </CCardHeader>
            <CCardBody>
                <CAlert color="danger" v-if="status === 'error'" closeButton>
                    Beklenmeyen bir hata oluştu!
                </CAlert>

                <CDataTable
                        :items="producers"
                        :fields="fields"
                        :loading="status === 'loading'"
                        column-filter
                        hover
                        sorter
                        pagination
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
                    {key: "id", label: "Üretici No."},
                    {key: "name", label: "Üretici Adı"},
                    {key: "masks", label: "Maske Stoğu"},
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
