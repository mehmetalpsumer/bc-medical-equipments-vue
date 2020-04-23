<template>
  <div>
    <CCard>
      <CCardHeader>
        Payments Awaiting Letter
      </CCardHeader>

      <CCardBody>
        <CDataTable
          :fields="tableFields"
          :items="payments"
          :loading="fetchStatus === 'loading'"
          sorter
          table-filter
          hover>
          <template #action="{item}">
            <td>
              <CButton color="primary" :disabled="submitStatus === 'loading'" @click="createPaymentLetter(item.id)">
                Create Payment Letter
              </CButton>
            </td>
          </template>
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
          { key: 'producerName', label: 'Producer Name' },
          { key: 'price', label: 'price' },
          { key: 'action', label: 'Action' },
        ]
      }
    },
    computed: {
      payments: function() {
        return this.$store.getters["payment/payments"];
      },
      fetchStatus: function() {
        return this.$store.getters["payment/fetchStatus"];
      },
      submitStatus: function() {
        return this.$store.getters["paymentLetter/submitStatus"];
      }
    },
    methods: {
      getPaymentsWithoutLetter: function() {
        this.$store.dispatch("payment/getPaymentsWithoutLetter");
      },
      getBankPaymentLetters: function() {
        const bankId = this.$store.getters.user.organization.id;
        this.$store.dispatch("paymentLetter/getBankPaymentLetters", bankId);
      },
      createPaymentLetter: function(paymentId) {
        const bankId = this.$store.getters.user.organization.id;
        this.$store.dispatch("paymentLetter/createPaymentLetter", {bankId, paymentId})
          .then(() => {
            this.getPaymentsWithoutLetter();
            this.getBankPaymentLetters();
          });
      }
    },
    mounted() {
      this.getPaymentsWithoutLetter();
    }
  }
</script>
