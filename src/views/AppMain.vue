<template>
  <div>
    <main id="main">
      <hero-section2></hero-section2>

      <div data-aos="fade-up">
        <popular-pre-view></popular-pre-view>
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

      <photo-control></photo-control>
    </main>
  </div>
  
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import HeroSection2 from "@/components/main/HeroSection2.vue";
import RectGrid from "@/components/main/RectGrid.vue";
import PopularPreView from "@/components/main/PopularPreView.vue";
import SlidePreVieww from "@/components/main/SlidePreVieww.vue";
import PhotoControl from "@/components/main/PhotoControl.vue";

export default {
  components: {
    SectionHeader,
    HeroSection2,
    RectGrid,
    PopularPreView,
    SlidePreVieww,
    PhotoControl
  },
};
</script>

<style></style>
