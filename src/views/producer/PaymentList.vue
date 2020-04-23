<template>
    <CCard>
        <CCardHeader>
            Payments

            <div class="card-header-actions">
                <CLink href="#" class="card-header-action btn-close" v-on:click="this.getProducerPaymentLetters">
                    <CIcon name="cil-reload"/>
                </CLink>
            </div>
        </CCardHeader>
        <CCardBody>
            <CDataTable
                    :items="paymentLetters"
                    :fields="fields"
                    :loading="fetchStatus === 'loading'"
                    column-filter
                    hover
                    sorter
                    pagination
            >
                <template #status="{item}">
                    <td>
                        <CBadge color="success">Ödeme Alındı</CBadge>
                    </td>
                </template>
            </CDataTable>
        </CCardBody>
    </CCard>
</template>

<script>
    export default {
        name: 'ProducerPaymentList',
        data: function() {
            return {
                fields: [
                    {key: 'id', label: 'Payment Letter ID'},
                    {key: 'name', label: 'Bank'},
                    {key: 'price', label: 'Amount'},
                    {key: 'date', label: 'Date'},
                    {key: 'status', label: 'Sipariş Durumu'},
                ],
            }
        },
        computed: {
            paymentLetters: function() {
                return this.$store.getters["paymentLetter/paymentLetters"];
            },
            fetchStatus: function() {
                return this.$store.getters["paymentLetter/fetchStatus"];
            }
        },
        methods: {
            getProducerPaymentLetters: function () {
                const producerId = this.$store.getters.user.organization.id;
                this.$store.dispatch("paymentLetter/getProducerPaymentLetters", producerId);
            }
        },
        mounted() {
            this.getProducerPaymentLetters();
        }
    };
</script>
