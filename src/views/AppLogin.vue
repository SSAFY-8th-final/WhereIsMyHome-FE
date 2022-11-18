<template>
<div>
    <bread-crumbs title="로그인 | 회원가입"></bread-crumbs>
    <section class="container-sm pd-4">
    <div class="bg-white border mx-auto" style="width: 100%;">
        <section class="w-100 p-4 d-flex justify-content-center pb-4">
        <div style="width: 26rem;">
            
            <login-form></login-form>
        </div>
        </section>
    </div>
    </section>
</div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import LoginForm from "@/components/login/LoginForm.vue";
export default {
    data: function () {
        return{
            loginTab: true
        }
    },
    components: {
        BreadCrumbs, LoginForm
    },
    methods: {
        tabControll: function () {
            this.loginTab = !this.loginTab
            console.log(this.loginTab)
        },
    },
}
</script>

<style scoped>

</style>