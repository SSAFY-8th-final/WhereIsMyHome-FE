<template>
  <div>
	<bread-crumbs title="공지사항"></bread-crumbs>
    <notice-list></notice-list>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
export default {
  components: {
	BreadCrumbs,
	NoticeList
  },
}
</script>

<style>

</style>