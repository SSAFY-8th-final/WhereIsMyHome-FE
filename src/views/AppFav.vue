<template>
<div>

    <hero-section-min></hero-section-min>
    <section-header title="Favorite" description="my favorite"></section-header>

    <pre-view></pre-view>
</div>

</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import HeroSectionMin from '@/components/HeroSectionMin.vue';
import PreView from "@/components/main/PreView.vue";


export default {
  components: {
    SectionHeader,
    HeroSectionMin,
    PreView,
  },
};
</script>

<style>

</style>