<template>
    <CCardBody>
        <CAlert color="danger" v-if="error" closeButton>
            Beklenmeyen bir hata oluştu!
        </CAlert>

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

</template>

<script>
    export default {
        name: 'HospitalList',
        data: function() {
            return {
                fields: ['id', 'name', 'group'],
            };
        },
        computed: {
            hospitals: function() {
              return this.$store.state.hospital.hospitals;
            },
            loading: function() {
                return this.$store.state.hospital.status === 'loading';
            },
            error: function() {
                return this.$store.state.hospital.status === 'error';
            }
        },
        mounted() {
            this.$store.dispatch('hospital/fetchAll');
        }
    };
</script>
