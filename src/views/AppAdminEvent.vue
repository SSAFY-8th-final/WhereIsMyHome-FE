<template>
  <div>
    <bread-crumbs title="이벤트 관리"></bread-crumbs>
    <admin-event></admin-event>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import AdminEvent from "@/components/admin/event/AdminEvent.vue";
export default {
  components: {
    BreadCrumbs,
    AdminEvent,
  },
};
</script>

<style></style>
