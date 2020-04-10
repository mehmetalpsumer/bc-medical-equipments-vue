<template>
    <CCardBody>
        <CRow>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                        header="1 adet"
                        text="YENİ SİPARİŞ"
                        color="warning"
                >
                    <CIcon name="cil-settings" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                        header="1 adet"
                        text="HAZIRLANAN SİPARİŞ"
                        color="secondary"
                >
                    <CIcon name="cil-pencil" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                        header="1 adet"
                        text="TESLİMAT AŞAMASINDA"
                        color="primary"
                >
                    <CIcon name="cil-moon" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                        header="2 adet"
                        text="TAMAMLANAN SİPARİŞ"
                        color="success"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
        </CRow>

        <CDataTable
                :items="orders"
                :fields="fields"
                column-filter
                hover
                sorter
                pagination
        >
            <template #status="{item}">
                <td>
                    <CBadge :color="getBadge(item.status)">{{getStatus(item.status)}}</CBadge>
                </td>
            </template>
            <template #action="{item}">
                <td>
                    <CButton size="sm" color="info" variant="outline" @click="updateStatus(item.id)">Güncelle</CButton>
                </td>
            </template>
        </CDataTable>
    </CCardBody>
</template>

<script>
    export default {
        name: 'ProducerOrderList',
        data: function() {
            return {
                fields: [
                    {key: 'id', label: 'Sipariş No.'},
                    {key: 'date', label: 'Sipariş Tarih/Saat'},
                    {key: 'amount', label: 'Sipariş Sayısı'},
                    {key: 'status', label: 'Sipariş Durumu'},
                    {key: 'action', label: 'Durum Güncelle'}
                ],
                orders: [
                    {id: 5, date: '2020-03-03 18:54', amount: 1000, status: 0},
                    {id: 3, date: '2020-03-02 18:54', amount: 1000, status: 1},
                    {id: 4, date: '2020-03-01 18:34', amount: 1000, status: 2},
                    {id: 2, date: '2020-03-01 12:54', amount: 5000, status: 3},
                    {id: 1, date: '2020-03-01 12:54', amount: 1000, status: 3},
                ]
            }
        },
        methods: {
            getBadge (status) {
                return status === 0 ? 'warning'
                    : status === 1 ? 'secondary'
                        : status === 2 ? 'primary'
                            : status === 3 ? 'success' : 'primary'
            },
            getStatus (status) {
                return status === 0 ? 'Yeni Sipariş'
                    : status === 1 ? 'Hazırlanıyor'
                        : status === 2 ? 'Teslimat Aşamasında'
                            : status === 3 ? 'Teslim Edildi' : '-'
            },
            updateStatus(id) {
                alert('Update ' + id);
            }
        }
    };
</script>
