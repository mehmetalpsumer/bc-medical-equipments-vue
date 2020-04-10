<template>
    <div>
        <CRow>
            <CCol sm="12" md="4">
                <CWidgetIcon
                        header="1350 adet maske"
                        text="Stokta"
                        color="primary"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol sm="12" md="4">
                <CWidgetIcon
                        header="250 adet maske"
                        text="TESLİM EDİLDİ"
                        color="success"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
            <CCol sm="12" md="4">
                <CWidgetIcon
                        header="50 adet maske"
                        text="BEKLENİYOR"
                        color="warning"
                >
                    <CIcon name="cil-bell" width="24"/>
                </CWidgetIcon>
            </CCol>
        </CRow>
        <CRow v-if="show">
            <CCol lg="12">
                <transition name="fade">
                    <CCard>
                        <CCardHeader>
                            <CIcon name="cil-pencil"/> Yeni Maske Talebi Oluştur
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
                        <CCollapse :show="formCollapsed">
                            <CCardBody>
                                <CInput
                                        label="Maske adedi"
                                        description="Gerekli olan maske miktarını girin"
                                        type="number"
                                        append="adet"
                                />
                                <div class="form-actions">
                                    <CButton type="submit" color="primary">Talebi Gönder</CButton>
                                </div>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </transition>
            </CCol>
        </CRow>
    </div>
</template>

<script>
    export default {
        name: 'HospitalDashboard',
        data () {
            return {
                show: true,
                formCollapsed: false,
            }
        },
        methods: {
            validator (val) {
                return val ? val.length >= 4 : false
            }
        }
    }
</script>
