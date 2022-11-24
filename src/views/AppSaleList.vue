<template>
    <div>
      <bread-crumbs title="등록한 매물"></bread-crumbs>
      <sale-list></sale-list>
    </div>
  </template>
  
  <script>
  import BreadCrumbs from "@/components/BreadCrumbs.vue";
  import SaleList from "@/components/sale/SaleList.vue";
  export default {
    components: {
      BreadCrumbs,
      SaleList,
    },
  };
  </script>
  
  <style></style>