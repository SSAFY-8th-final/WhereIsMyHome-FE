<template>
  <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
    <div class="post-item position-relative h-100">
      <toggle-fav id="favBtn"></toggle-fav>
      <div class="post-img position-relative overflow-hidden">
        <img src="assets/img/interior-1.jpg" class="img-fluid" alt="" />
        <span class="post-date">서울시 사직동</span>
      </div>

      <div class="post-content d-flex flex-column">
        <h3 class="post-title">광화문풍림스페이스본</h3>
        <p>저층 / 관리비 10만 / 신대방역 도보 5분거리 초역세권, 저렴한 원룸입니다.</p>

        <div class="meta d-flex align-items-center">
          <div class="d-flex align-items-center">
            <i class="fa-regular fa-building"></i> <span class="ps-2">2008</span>
          </div>
          <span class="px-3 text-black-50">/</span>
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-chart-area"></i> <span class="ps-2">97.61 (㎡)</span>
          </div>
        </div>

        <hr />

        <a href="/detail" class="readmore stretched-link"
          ><span>Read More</span><i class="bi bi-arrow-right"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleFav from "@/components/map/ToggleFav.vue";
export default {
  components: {
    ToggleFav
  }
};
</script>

<style scoped>
.post-item >>> img {
  height: 270px;
  width: 100%;
}
#favBtn {
  position: absolute;
  right:0;
  z-index: 1;
}
</style>
