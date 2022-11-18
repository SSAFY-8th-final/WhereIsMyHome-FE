<template>
    <div>
      <bread-crumbs title="사용자 관리"></bread-crumbs>
      <admin-user></admin-user>
    </div>
  </template>
  
  <script>
  import BreadCrumbs from "@/components/BreadCrumbs.vue";
  import AdminUser from "@/components/admin/user/AdminUser.vue";
  export default {
    components: {
      BreadCrumbs,
      AdminUser,
    },
  };
  </script>
  
  <style></style>
  