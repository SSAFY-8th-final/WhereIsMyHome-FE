<template>
  <!-- ======= Alt Services Section ======= -->
  <section id="alt-services" class="alt-services ">
    <div class="container" data-aos="fade-up">
      <div class="row justify-content-around gy-4">
        <div class="col d-flex flex-column justify-content-center">
          <h3>공지사항</h3>

          <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="100" v-for="(notice, index) in list" :key="index">
            <i class="bi bi-easel flex-shrink-0"></i>
            <div>
              <h4><a href="#/notice" class="stretched-link" >{{notice.title}}</a></h4>
              <p v-html="notice.content">
              </p>
            </div>
          </div>
          <!-- End Icon Box -->
        </div>
      </div>
    </div>
  </section>
  <!-- End Alt Services Section -->
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  async created() {
    let list = await this.$store.dispatch('getRecentNotice');
    this.list = list;
  }
};
</script>

<style></style>
