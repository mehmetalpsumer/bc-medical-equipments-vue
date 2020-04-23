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
                    <template #status="{item}">
                        <td>
                            <CSelect
                                :options="selectOptions"
                                :value.sync="item.status">

                            </CSelect>
                        </td>
                    </template>

                    <template #action="{item}">
                        <td>
                            <CButton color="primary"
                                     @click="updateDelivery(item.id, item.status)"
                                     :disabled="submitStatus === 'loading'">
                                <span v-if="submitStatus === 'loading'" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
                    { key: 'id', label: 'ID' },
                    { key: 'date', label: 'Date' },
                    { key: 'producer', label: 'Producer' },
                    { key: 'status', label :'Delivery Status' },
                    { key: 'action', label :'Action' },
                ],
                selectOptions: [
                    { value: '0', label: '0' },
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
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
            submitStatus: function() {
                return this.$store.getters["delivery/submitStatus"];
            }
        },
        methods: {
            getProducerDeliveries: function() {
                const producerId = this.$store.getters.user.organization.id;
                this.$store.dispatch("delivery/getProducerDeliveries", producerId);
            },
            updateDelivery: function(deliveryId, status) {
                this.$store.dispatch("delivery/updateDelivery", {deliveryId, status})
                    .then(() => {
                        this.getProducerDeliveries();
                    })
            }
        },
        mounted() {
            this.getProducerDeliveries();
        }
    }
</script>
