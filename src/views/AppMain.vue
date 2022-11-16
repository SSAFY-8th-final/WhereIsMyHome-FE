<template>
  <div>
    <main id="main">
      <hero-section></hero-section>

      <div data-aos="fade-up">
        <section-header title="인기 매물" description="hello"></section-header>
        <pre-view></pre-view>
      </div>

      <div data-aos="fade-up">
        <section-header title="동네정보" description="hello"></section-header>
        <rect-grid></rect-grid>
      </div>

      <div data-aos="fade-up">
        <section-header title="test" description="hello"></section-header>
        <post-card></post-card>
      </div>

      <four-tab></four-tab>

      <photo-control></photo-control>

      <div data-aos="fade-up">
        <section-header
          title="서울시 대장 아파트"
          description="10년 이내, 1천 세대 이상, 국민평형이라고 불리는 30평형대에서 평단가가 가장 높은 아파트"
        ></section-header>
        <SlidePreVieww></SlidePreVieww>
      </div>

      <section-header title="test" description="hello"></section-header>
      <slide-post></slide-post>
    </main>
  </div>
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import HeroSection from "@/components/main/HeroSection.vue";
import PostCard from "@/components/main/PostCard.vue";
import RectGrid from "@/components/main/RectGrid.vue";
import PhotoControl from "@/components/main/PhotoControl.vue";
import FourTab from "@/components/main/FourTab.vue";
import SlidePost from "@/components/main/SlidePost.vue";
import PreView from "@/components/PreView.vue";
import SlidePreVieww from "@/components/main/SlidePreVieww.vue";

export default {
  components: {
    SectionHeader,
    HeroSection,
    PostCard,
    RectGrid,
    PhotoControl,
    FourTab,
    SlidePost,
    PreView,
    SlidePreVieww,
  },
};
</script>

<style></style>
