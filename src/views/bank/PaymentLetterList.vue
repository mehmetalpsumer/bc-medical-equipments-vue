<template>
  <div>
    <CCard>
      <CCardHeader>
        Payment Letters
      </CCardHeader>

      <CCardBody>
        <CDataTable
          :fields="tableFields"
          :items="paymentLetters"
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
          { key: 'order', label: 'Order ID' },
          { key: 'price', label: 'Amount' },
          { key: 'date', label: 'Date/Time' }
        ]
      }
    },
    computed: {
      paymentLetters: function() {
        return this.$store.getters["paymentLetter/paymentLetters"];
      },
      fetchStatus: function() {
        return this.$store.getters["paymentLetter/fetchStatus"];
      },
    },
    methods: {
      getBankPaymentLetters: function() {
        const bankId = this.$store.getters.user.organization.id;
        this.$store.dispatch("paymentLetter/getBankPaymentLetters", bankId);
      }
    },
    mounted() {
      this.getBankPaymentLetters();
    }
  }
</script>
