<template>
    <div>
        <bread-crumbs title="회원가입"></bread-crumbs>
        <section class="container-sm pd-2">
        <div class="bg-white mx-auto" style="width: 100%;">
            <section class="w-100 p-4 d-flex justify-content-center pb-4">
            <div style="width: 26rem;">
                
                <register-form></register-form>
            </div>
            </section>
        </div>
        </section>
    </div>
    </template>
    
    <script>
    import BreadCrumbs from "@/components/BreadCrumbs.vue";
    import RegisterForm from "@/components/register/RegisterForm.vue";
    export default {
        data: function () {
            return{
            }
        },
        components: {
            BreadCrumbs, RegisterForm
        },
        methods: {
        },
    }
    </script>
    
    <style scoped>
    div >>> section {
        padding: 10px 0;
    }
    </style>