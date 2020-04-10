<template>
    <div>
        <CRow>
            <CCol sm="12">
                <CInput
                        label="Makbuz No."
                        type="number"
                        steps="1"
                />
            </CCol>
        </CRow>
        <CRow>
            <CCol sm="12">
                <CInput
                        label="Ödemeyi Yapan"
                        value="T.C. Sağlık Bakanlığı"
                        disabled="true"
                />
            </CCol>
        </CRow>
        <CRow>
            <CCol sm="12">
                <CInput
                        label="Ödeme Tutarı"
                        type="number"
                        step="0.01"
                        prepend="₺"
                />
            </CCol>
        </CRow>
        <div class="form-actions">
            <CButton type="submit" color="primary">Makbuzu Oluştur</CButton>
        </div>
    </div>
</template>
