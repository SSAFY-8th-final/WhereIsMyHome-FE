<template>
  <div>
    <bread-crumbs title="공지사항 관리"></bread-crumbs>
    <admin-notice></admin-notice>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import AdminNotice from "@/components/admin/notice/AdminNotice.vue";
export default {
  components: {
    BreadCrumbs,
    AdminNotice,
  },
};
</script>

<style></style>
