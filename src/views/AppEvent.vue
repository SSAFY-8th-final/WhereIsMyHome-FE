<template>
  <div>
    <bread-crumbs title="이벤트"></bread-crumbs>
    <image-grid></image-grid>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import ImageGrid from "@/components/event/ImageGrid.vue";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  components: {
    BreadCrumbs,
    ImageGrid,
  },
  methods: {
    eventList() {
      this.$store.dispatch("eventList");
      console.log(this.$store.state.event.list);
    }
  },
  created() {
    this.eventList();
  }
};
</script>

<style>
  
</style>
