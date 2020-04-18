<template>
    <div>
        <!-- Ministry stocks -->
        <MinistryStocks></MinistryStocks>

        <!-- Hospital list -->
        <CCard>
            <CCardHeader>
                Hastane Listesi ve Maske İhtiyaçları
            </CCardHeader>
            <CCardBody>
                <CAlert color="danger" v-if="error" closeButton>
                    Beklenmeyen bir hata oluştu!
                </CAlert>

                <!--
                <CButton block="true" color="secondary" @click="fetchAllHospitals">
                    <CIcon name="cil-reload"/>
                    <span>Yenile</span>
                </CButton>
                -->

                <CDataTable
                        :items="hospitals"
                        :fields="fields"
                        :loading="loading"
                        column-filter
                        hover
                        sorter
                        pagination
                >

                </CDataTable>
            </CCardBody>

            <!-- Card footer, refresh date -->
            <CCardFooter v-if="success">
                Son güncellenme tarihi: {{fetchDate}}.
            </CCardFooter>
        </CCard>
    </div>
</template>

<script>
    import MinistryStocks from "./MinistryStocks";

    export default {
        name: 'HospitalList',
        components: {MinistryStocks},
        data: function() {
            return {
                fields: [
                    {key: "id", label: "Hastane No."},
                    {key: "name", label: "Hastane Adı"},
                    {key: "total", label: "Maske İhtiyacı"}
                ],
            };
        },
        computed: {
            hospitals: function() {
              return this.$store.getters["ministryHospitals/hospitals"];
            },
            success: function() {
                return this.$store.getters["ministryHospitals/status"] === 'success';
            },
            loading: function() {
                return this.$store.getters["ministryHospitals/status"] === 'loading';
            },
            error: function() {
                return this.$store.getters["ministryHospitals/status"] === 'error';
            },
            fetchDate: function() {
                return this.$store.getters["ministryHospitals/fetchDate"];
            }
        },
        mounted() {
            this.fetchAllHospitals();
        },
        methods: {
            fetchAllHospitals: function() {
                this.$store.dispatch('ministryHospitals/fetchAll');
            }
        }
    };
</script>
