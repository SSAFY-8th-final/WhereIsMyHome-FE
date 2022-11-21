<template>
    <div>
    <bread-crumbs title="내 정보 수정"></bread-crumbs>
    <mypage-form></mypage-form>
</div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import mypageForm from "@/components/mypage/mypageForm.vue";

export default {
    data: function () {
        return{
            
        }
    },
    components: {
        BreadCrumbs, mypageForm
    }
}
</script>

<style>

</style>