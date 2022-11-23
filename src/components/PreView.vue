<template>
  <!-- ======= Recent Blog Posts Section ======= -->
  <section id="recent-blog-posts" class="recent-blog-posts">
    <div class="container" data-aos="fade-up">
      <!-- section header -->

      <div class="row gy-5">
        <PreviewUI :el="el" v-for="(el, index) in list" :key="index"></PreviewUI>
        <!-- End post item -->
      </div>
    </div>
  </section>
  <!-- End Recent Blog Posts Section -->
</template>

<script>
import PreviewUI from "@/components/PreViewUI.vue";
export default {
  props: ['list'],
  components: {
    PreviewUI
  }
};
</script>

<style scoped>
.row > * {
  padding-right: calc(1.5rem * .5);
  padding-left: calc(1.5rem * .5);
}
</style>
