<template>
  <div>
    <CCard>
      <CCardHeader>
        Delivery List
      </CCardHeader>

      <CCardBody>
        <CDataTable
          :fields="tableFields"
          :items="deliveries"
          :loading="fetchStatus === 'loading'"
          sorter
          table-filter
          hover>

        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        tableFields: [
          { key: 'id', label: 'ID' },
          { key: 'date', label: 'Date' },
          { key: 'producer', label: 'Producer' },
          { key: 'status', label :'Delivery Status' },
        ]
      }
    },
    computed: {
      deliveries: function() {
        return this.$store.getters["delivery/deliveries"].map((delivery) => {
          delivery['producer'] = delivery.producer.name;
          return delivery;
        });
      },
      fetchStatus: function() {
        return this.$store.getters["delivery/fetchStatus"];
      },
    },
    methods: {
      getAllDeliveries: function() {
        this.$store.dispatch("delivery/getAllDeliveries");
      },
    },
    mounted() {
      this.getAllDeliveries();
    }
  }
</script>
