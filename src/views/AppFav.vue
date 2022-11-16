<template>
<div>

    <div class="page-gap"></div>
    <section-header title="Favorite" description="my favorite"></section-header>

    <pre-view></pre-view>
</div>

</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import PreView from "@/components/PreView.vue";


export default {
  components: {
    SectionHeader,
    PreView,
  },
};
</script>

<style>

</style>