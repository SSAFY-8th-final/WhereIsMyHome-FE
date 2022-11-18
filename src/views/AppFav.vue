<template>
  <div>
      <bread-crumbs title="관심목록"></bread-crumbs>
      <four-tab></four-tab>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import FourTab from "@/components/fav/FourTab.vue";


export default {
  components: {
    BreadCrumbs,
    FourTab,
  },
};
</script>

<style>

</style>