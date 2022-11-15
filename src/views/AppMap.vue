<template>
<div>
  <map-side-pannel></map-side-pannel>
  <kakao-map></kakao-map>

</div>
</template>

<script>
import KakaoMap from '@/components/map/KakaoMap.vue';
import MapSidePannel from '@/components/map/MapSidePannel.vue';

export default {
  components: { KakaoMap, MapSidePannel },

}
</script>

<style>

</style>