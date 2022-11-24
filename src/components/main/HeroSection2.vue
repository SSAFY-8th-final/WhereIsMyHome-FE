<template>
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="hero">
    <div class="info d-flex align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <h2 data-aos="fade-down">어떤 방을 찾으세요?</h2>
            <p data-aos="fade-up">
              원하는 방을 찾을 수 있도록 도와드릴게요.
            </p>
          </div>
        </div>
        <search-bar2></search-bar2>
        
      </div>
    </div>

    <div id="hero-carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
      <div
        class="carousel-item active"
        style="background-image: url(assets/img/hero-carousel/hero-carousel-1.jpg)"
      ></div>
      <div
        class="carousel-item"
        style="background-image: url(assets/img/hero-carousel/hero-carousel-2.jpg)"
      ></div>
      <div
        class="carousel-item"
        style="background-image: url(assets/img/hero-carousel/hero-carousel-3.jpg)"
      ></div>
      <div
        class="carousel-item"
        style="background-image: url(assets/img/hero-carousel/hero-carousel-4.jpg)"
      ></div>
      <div
        class="carousel-item"
        style="background-image: url(assets/img/hero-carousel/hero-carousel-5.jpg)"
      ></div>

      <a class="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
        <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
      </a>

      <a class="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
        <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
      </a>
    </div>

  </section>
  <!-- End Hero Section -->
</template>

<script>
import SearchBar2 from "@/components/main/SearchBar2.vue";
export default {
  components: {
    SearchBar2,
  },
};
</script>

<style scoped>
/* section >>> #ohh{
  z-index: 999;
  top: -100px;
} */
</style>
