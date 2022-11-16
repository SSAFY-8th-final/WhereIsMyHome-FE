<template>
  <div>
    <div class="page-gap"></div>
    <section-header title="Event" description="event~~~~~~"></section-header>
    <image-grid></image-grid>
  </div>
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import ImageGrid from "@/components/event/ImageGrid.vue";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  components: {
    SectionHeader,
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
