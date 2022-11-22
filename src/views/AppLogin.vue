<template>
<div>
    <bread-crumbs title="로그인"></bread-crumbs>
    <section class="container-sm pd-2">
    <div class="bg-white mx-auto" style="width: 100%;">
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
    components: {
        BreadCrumbs, LoginForm
    },
}
</script>

<style scoped>

</style>