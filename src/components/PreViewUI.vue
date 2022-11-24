<template>
  <div class="col-xl-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
    <div class="post-item position-relative h-100">
      <toggle-fav id="favBtn" :no="el.no" :isFav="el.isFav"></toggle-fav>
      <div class="post-img position-relative overflow-hidden">
        <img src="assets/img/interior-1.jpg" class="img-fluid" alt="" />
        <span class="post-date">{{ computedAddress }}</span>
      </div>

      <div class="post-content d-flex flex-column">
        <h3 class="post-title">{{el.AptName}}</h3>
        <p>{{el.floor}}층 / 관리비 {{el.utilityBill}} / {{el.description}}</p>

        <div class="meta d-flex align-items-center">
          <div class="d-flex align-items-center">
            <i class="fa-regular fa-building"></i> <span class="ps-2">{{el.buildYear}}</span>
          </div>
          <span class="px-3 text-black-50">/</span>
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-chart-area"></i> <span class="ps-2">{{el.area}} (㎡)</span>
          </div>
        </div>

        <hr />

        <a :href="pathUrl" class="readmore"
          ><span>Read More</span><i class="bi bi-arrow-right"></i
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleFav from "@/components/map/ToggleFav.vue";
export default {
  props: ['el'],
  components: {
    ToggleFav
  },
  computed: {
    pathUrl() {
      return '#/detail/' + this.el.no;
    },
    computedAddress() {
      let address = this.$store.getters.getAddressByDongCode(this.el.dongCode);
      return address.sido + " " + address.sigungu + " " + address.dong;
    }
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
