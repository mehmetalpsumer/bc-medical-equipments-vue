<template>
    <div>
        <!-- Ministry stocks -->
        <MinistryStocks></MinistryStocks>

        <!-- Hospital list -->
        <CCard>
            <CCardHeader>
                Hospitals

                <div class="card-header-actions">
                    <CLink href="#" class="card-header-action btn-close" v-on:click="fetchAllHospitals">
                        <CIcon name="cil-reload"/>
                    </CLink>
                </div>
            </CCardHeader>
            <CCardBody>
                <CAlert color="danger" v-if="error" closeButton>
                    An error occurred!
                </CAlert>

                <CDataTable
                        :items="hospitals"
                        :fields="fields"
                        :loading="loading"
                        column-filter
                        hover
                        sorter
                >

                </CDataTable>
            </CCardBody>

            <!-- Card footer, refresh date -->
            <CCardFooter v-if="success">
                Last updated on: {{fetchDate}}.
            </CCardFooter>
        </CCard>

        <HospitalOrderList></HospitalOrderList>
    </div>
</template>

<script>
    import MinistryStocks from "./MinistryStocks";
    import HospitalOrderList from "./HospitalOrderList";

    export default {
        name: 'HospitalList',
        components: {HospitalOrderList, MinistryStocks},
        data: function() {
            return {
                fields: [
                    {key: "id", label: "Hospital ID"},
                    {key: "name", label: "Hospital Name"},
                    {key: "total", label: "Total Requested Masks"}
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
