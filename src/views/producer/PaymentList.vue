<template>
    <CCardBody>
        <CDataTable
                :items="payments"
                :fields="fields"
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
</template>

<script>
    export default {
        name: 'ProducerPaymentList',
        data: function() {
            return {
                fields: [
                    {key: 'id', label: 'Ödeme No.'},
                    {key: 'date', label: 'Ödeme Tarih/Saat'},
                    {key: 'amount', label: 'Ödenen Tutar'},
                    {key: 'bank', label: 'Banka'},
                    {key: 'status', label: 'Sipariş Durumu'},
                ],
                payments: [
                    {id: 5, date: '2020-03-03 18:54', amount: '₺ 1000.00', bank: 'İş Bankası'},
                    {id: 3, date: '2020-03-02 18:54', amount: '₺ 500.00', bank: 'Akbank'},
                    {id: 4, date: '2020-03-01 18:34', amount: '₺ 2000.00', bank: 'Akbank'},
                    {id: 1, date: '2020-03-01 12:54', amount: '₺ 5000.00', bank: 'Ziraat Bankası'},
                ]
            }
        },
    };
</script>
