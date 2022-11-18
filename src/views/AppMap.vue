<template>
<div>
  <map-nav-bg></map-nav-bg>
  <div>
    <map-side-pannel></map-side-pannel>
    <kakao-map></kakao-map>

  </div>

</div>
</template>

<script>
import KakaoMap from '@/components/map/KakaoMap.vue';
import MapSidePannel from '@/components/map/MapSidePannel.vue';
import MapNavBg from "@/components/map/MapNavBg.vue";

export default {
  components: { KakaoMap, MapSidePannel, MapNavBg },

}
</script>

<style scoped>
</style>