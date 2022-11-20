<template>
  <div>
    <main id="main">
      <hero-section></hero-section>

      <div data-aos="fade-up">
        <section-header title="인기 매물" description="hello"></section-header>
        <pre-view></pre-view>
      </div>

      <div data-aos="fade-up">
        <rect-grid></rect-grid>
      </div>

      <div data-aos="fade-up">
        <section-header
          title="서울시 대장 아파트"
          description="10년 이내, 1천 세대 이상, 국민평형이라고 불리는 30평형대에서 평단가가 가장 높은 아파트"
        ></section-header>
        <SlidePreVieww></SlidePreVieww>
      </div>
    </main>
  </div>
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import HeroSection from "@/components/main/HeroSection.vue";
import RectGrid from "@/components/main/RectGrid.vue";
import PreView from "@/components/PreView.vue";
import SlidePreVieww from "@/components/main/SlidePreVieww.vue";

export default {
  components: {
    SectionHeader,
    HeroSection,
    RectGrid,
    PreView,
    SlidePreVieww,
  },
};
</script>

<style></style>
