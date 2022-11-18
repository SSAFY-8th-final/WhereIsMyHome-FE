<template>
  <div>
    <main id="main">
      <bread-crumbs title="이벤트 상세"></bread-crumbs>
      <content-section></content-section>
    </main>
  </div>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import ContentSection from '@/components/event/ContentSection.vue';
export default {
  components: {
    BreadCrumbs,
    ContentSection
  }
}
</script>

<style>

</style>