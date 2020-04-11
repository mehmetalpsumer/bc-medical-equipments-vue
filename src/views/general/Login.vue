<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CRow v-if="loading">
            <CSpinner grow size="lg"/>
        </CRow>
        <CRow v-if="!loading">
            <CCol>
                <CCardGroup>
                    <CCard class="p-4">
                        <CCardBody>
                            <CAlert color="danger" v-if="error" closeButton>
                                Hata! Bilgilerinizi doğru girdiğinizden emin olun.
                            </CAlert>
                            <CAlert color="success" v-if="success" closeButton>
                                Giriş başarılı {{ user ? user.username : '' }}, yönlendiriliyorsunuz...
                            </CAlert>
                            <CForm @submit="login">
                                <h1>Giriş Yapın</h1>
                                <p class="text-muted">Hesabınıza giriş yapın</p>
                                <CInput
                                        placeholder="Kullanıcı adı"
                                        autocomplete="username email"
                                        v-model="username"
                                        type="text"
                                >
                                    <template #prepend-content><CIcon name="cil-user"/></template>
                                </CInput>
                                <CInput
                                        placeholder="Şifre"
                                        type="password"
                                        autocomplete="curent-password"
                                        v-model="password"
                                >
                                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                                </CInput>
                                <CRow>
                                    <CCol col="6" class="text-left">
                                        <CButton type="submit" color="primary" class="px-4">Giriş</CButton>
                                    </CCol>
                                    <CCol col="6" class="text-right">
                                        <CButton color="link" class="d-md-none">Kayıt ol!</CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCardGroup>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script>
    export default {
        name: 'Login',
        data: function() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                let username = this.username;
                let password = this.password;
                this.$store.dispatch('login', { username, password })
                    .then(() => {
                        setTimeout(() => {
                            switch (this.$store.getters.user.organization.group) {
                                case 'MINISTRY':
                                    this.$router.push('/ministry');
                                    break;
                                case 'BANK':
                                    this.$router.push('/bank');
                                    break;
                                case 'HOSPITAL':
                                    this.$router.push('/hospital');
                                    break;
                                case 'PRODUCER':
                                    this.$router.push('/producer');
                                    break;
                                default:
                                    console.log('Invalid org.');
                            }
                            console.log(this.$store.getters.user);
                        }, 1000)
                    })
                    .catch(err => console.log(err))
            }
        },
        computed: {
            loading: function() {
                return this.$store.getters.status === 'loading';
            },
            error: function() {
                return this.$store.getters.status === 'error';
            },
            success: function() {
                return this.$store.getters.status === 'success';
            },
            user: function() {
                console.log(this.$store.getters.user);
                return this.$store.getters.user;
            }
        }
    }
</script>
