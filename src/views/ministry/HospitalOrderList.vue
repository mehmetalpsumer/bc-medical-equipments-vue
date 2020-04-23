<template>
  <div>
    <CCard>
      <CCardHeader>
        Hospital Requests
      </CCardHeader>

      <CCardBody>
        <CAlert color="danger" v-if="fetchStatus === 'error'">
          An error occured.
        </CAlert>
        <CDataTable
          v-if="fetchStatus !== 'error'"
          :items="orders"
          :fields="tableFields"
          :loading="fetchStatus === 'loading'"
          sorter
          table-filter
          hover
        >

          <template #status="{item}">
            <td>
              <CSelect :options="statusSelectOptions" :value.sync="item.status">
              </CSelect>
            </td>
          </template>

          <template #updateStatus="{item}">
            <td>
              <CButton outline color="primary" @click="updateOrder(item.id, item.status)" :disabled="updateStatus === 'loading'">
                <span v-if="updateStatus === 'loading'" class="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"></span>
                Update Status
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
          { key: 'hospitalName', label: 'Hospital' },
          { key: 'date', label: 'Date' },
          { key: 'amount', label: 'Mask Amount' },
          { key: 'urgency', label: 'Priority' },
          { key: 'status', label: 'Status' },
          { key: 'updateStatus', label: 'Action' },
        ],
        statusSelectOptions: [
          { value: '0', label: 'Waiting' },
          { value: '1', label: 'Preparing' },
          { value: '2', label: 'On Route' },
          { value: '3', label: 'Delivered' },
        ]
      }
    },
    computed: {
      orders: function() {
        const orders = this.$store.getters["hospitalOrder/orders"];
        const all = [];
        orders.forEach((order) => {
          order.orders.forEach((o) => {
            o.hospitalId = order.id;
            o.hospitalName = order.name;
            all.push(o);
          });
        });
        return all;
      },
      fetchStatus: function() {
        return this.$store.getters["hospitalOrder/fetchStatus"];
      },
      updateStatus: function () {
        return this.$store.getters["hospitalOrder/updateStatus"];
      }
    },
    methods: {
      getAllOrders: function() {
        this.$store.dispatch("hospitalOrder/getAllHospitalOrders");
      },
      updateOrder: function(orderId, status) {
        this.$store.dispatch("hospitalOrder/updateHospitalOrder", {orderId, status})
          .then(() => {
            this.getAllOrders();
          });
      },
      getOrderStatus(status) {
        switch (status) {
          case 0:
            return 'Waiting';
          case 1:
            return 'Preparing';
          case 2:
            return 'On Route';
          case 3:
            return 'Delivered';
          default:
            return '-';
        }
      }
    },
    mounted() {
      this.getAllOrders();
    }
  }
</script>
