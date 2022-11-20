<template>
    <div>
        <bread-crumbs title="매물 등록"></bread-crumbs>
        <address-api></address-api>
    </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import AddressApi from "@/components/sale/AddressApi.vue";
export default {
  components: {
	BreadCrumbs,
	AddressApi
  },
}
</script>

<style>

</style>