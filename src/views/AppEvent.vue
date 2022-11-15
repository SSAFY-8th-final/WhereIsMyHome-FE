<template>
  <div>
    <hero-section-min></hero-section-min>
    <section-header title="Event" description="event~~~~~~"></section-header>
    <image-grid></image-grid>
  </div>
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import HeroSectionMin from "@/components/HeroSectionMin.vue";
import ImageGrid from "@/components/event/ImageGrid.vue";

export default {
  components: {
    SectionHeader,
    HeroSectionMin,
    ImageGrid,
  },
};
</script>

<style></style>
