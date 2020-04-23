<template>
  <div>
    <!-- Payment form -->
    <CCard>
      <CCardHeader>
        <CIcon name="cil-pencil"/> Submit New Payment
        <div class="card-header-actions">
          <CLink
                  class="card-header-action btn-minimize"
                  @click="formCollapsed=!formCollapsed"
          >
            <CIcon :name="`cil-chevron-${formCollapsed ? 'bottom' : 'top'}`"/>
          </CLink>
          <CLink href="#" class="card-header-action btn-close" v-on:click="show = !show">
            <CIcon name="cil-x-circle"/>
          </CLink>
        </div>
      </CCardHeader>

      <CCardBody>
        <CSpinner v-if="ordersFetchStatus === 'loading'"></CSpinner>
        <CForm v-if="ordersFetchStatus !== 'loading'" @submit="createPayment()">
          <CSelect
            :options="orders.map(o => o.id)"
            placeholder="Select order to pay..."
            v-model="selectedOrderId"></CSelect>
          <CInput label="Order ID" v-model="selectedOrder.id" disabled></CInput>
          <CInput label="Mask Amount" v-model="selectedOrder.amount" disabled></CInput>
          <CInput label="Order Open Date" v-model="selectedOrder.openDate" disabled></CInput>
          <CInput label="Order Closed Date" v-model="selectedOrder.endDate" disabled></CInput>
          <CInput label="Price" v-model="offerPrice" disabled></CInput>
          <CButton type="submit" color="primary" :disabled="offerPrice === 'Loading...' || !selectedOrderId || submitStatus === 'loading'">
            <span v-if="submitStatus === 'loading'" class="spinner-border spinner-border-sm" role="status"
                  aria-hidden="true"></span>
            Submit Payment
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>

    <!-- Payments -->
    <CCard>
      <CCardHeader>
        Payments List
      </CCardHeader>

      <CCardBody>
        <CDataTable
          :fields="tableFields"
          :items="payments"
          :loading="fetchStatus === 'loading'"
          table-filter
          sorter
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
        selectedOrderId: null,
        selectedOrder: {
          id: null,
          amount: null,
          openDate: null,
          endDate: null,
        },
        formCollapsed: false,
        show: true,
        tableFields: [
          { key: 'order', label: 'Order ID' },
          { key: 'price', label: 'Payment Amount' },
        ]
      }
    },
    computed: {
      orders: function() {
        return this.$store.getters["ministryOrders/orders"];
      },
      payments: function() {
        return this.$store.getters["payment/payments"];
      },
      fetchStatus: function() {
        return this.$store.getters["payment/fetchStatus"];
      },
      submitStatus: function() {
        return this.$store.getters["payment/submitStatus"];
      },
      ordersFetchStatus: function() {
        return this.$store.getters["ministryOrders/fetchStatus"];
      },
      offer: function() {
        return this.$store.getters["offer/offers"][0];
      },
      offerPrice: function() {
        const offer = this.$store.getters["offer/offers"][0];
        return offer ? offer.offer : 'Loading...';
      }
    },
    methods: {
      getAllPayments: function() {
        this.$store.dispatch("payment/getAllPayments");
      },
      createPayment: function() {
        const orderId = this.selectedOrderId.target.value;
        const price = this.offerPrice;
        const producerId = this.offer["producer"];

        if (!orderId || !price || !producerId) {
          alert(orderId + ' ' +  price);
          return;
        }

        this.$store.dispatch("payment/createPayment", {orderId, price, producerId})
          .then(() => {
            this.getAllPayments();
            this.getUnpaidOrders();
            this.$store.dispatch("offer/clearOffers");
          });
      },
      getUnpaidOrders: function() {
        this.$store.dispatch("ministryOrders/getUnpaidOrders");
      },
      getOrderOffers: function(orderId) {
        this.$store.dispatch("offer/getOrderOffers", orderId);
      }
    },
    mounted() {
      this.getAllPayments();
      this.getUnpaidOrders();
      this.$store.dispatch("offer/clearOffers");
    },
    watch: {
      selectedOrderId: function(event) {
        this.selectedOrder = this.orders.find(x => x.id === event.target.value);
        this.getOrderOffers(event.target.value);
      }
    }
  }
</script>
