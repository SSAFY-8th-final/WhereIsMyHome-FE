<template>
  <!-- ======= Our Projects Section ======= -->
  <section id="projects" class="projects">
    <div class="container" data-aos="fade-up">
      <div
        class="portfolio-isotope"
        data-portfolio-filter="*"
        data-portfolio-layout="masonry"
        data-portfolio-sort="original-order"
      >
        <ul class="portfolio-flters" data-aos="fade-up" data-aos-delay="100">
          <li data-filter="*" class="filter-active">All</li>
          <li data-filter=".filter-proceeding">진행중</li>
          <li data-filter=".filter-end">종료</li>
        </ul>
        <!-- End Projects Filters -->

        <div class="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">
          <image-item :event="event" v-for="(event, index) in listGetters" :key="index"></image-item>
        </div>
        <!-- End Projects Container -->
      </div>
    </div>
  </section>
  <!-- End Our Projects Section -->
</template>

<script>
import ImageItem from "@/components/event/ImageItem.vue";


export default {
  components: {
    ImageItem
  },
  computed: {
    listGetters() {
      return this.$store.getters.getEventList;
    }
  }
};
</script>

<style scoped>
.row > * {
  padding-right: calc(1.5rem * .5);
  padding-left: calc(1.5rem * .5);
}
section {
  height: 1000px;
}
</style>
