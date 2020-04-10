<template>
    <div class="d-flex align-items-center min-vh-100">
        <CContainer fluid>
            <CRow class="justify-content-center">
                <CCol md="6">
                    <CCard class="mx-4 mb-0">
                        <CCardBody class="p-4">
                            <CForm @submit="register">
                                <h1>Kayıt Ol</h1>
                                <p class="text-muted">Bu alan sadece demo için kullanılacaktır</p>
                                <CInput
                                        placeholder="Kullanıcı adı"
                                        autocomplete="username"
                                        v-model="username"
                                >
                                    <template #prepend-content><CIcon name="cil-user"/></template>
                                </CInput>
                                <CSelect
                                        placeholder="Kurum seçin..."
                                        :value.sync="organization"
                                        :options="organizations"
                                >
                                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                </CSelect>
                                <CInput
                                        placeholder="Şifre"
                                        type="password"
                                        autocomplete="new-password"
                                        v-model="password"
                                >
                                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                </CInput>
                                <CInput
                                        placeholder="Şifre tekrar"
                                        type="password"
                                        autocomplete="new-password"
                                        class="mb-4"
                                        v-model="passwordConfirm"
                                >
                                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                </CInput>
                                <CButton color="success" type="submit" block>Hesabı Oluştur</CButton>
                            </CForm>
                        </CCardBody>

                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data: function() {
            return {
                organizations: [
                    {value: 1, label: 'Sağlık Bakanlığı'},
                    {value: 2, label: 'Hastane'},
                    {value: 3, label: 'Üretici'},
                    {value: 4, label: 'Banka'},
                ],
                username: '',
                password: '',
                passwordConfirm: '',
                organization: 1
            }
        },
        methods: {
            register: function () {
                let data = {
                    username: this.username,
                    password: this.password,
                    organization: this.organization,
                };
                console.log(data);
                return;
                this.$store.dispatch('register', data)
                    .then(() => this.$router.push('/login'))
                    .catch(err => console.log(err));
            }
        }
    }
</script>
