<template>
  <div class="position-relative h-100">
        <div class="slides-1 portfolio-details-slider swiper">
            <div class="swiper-wrapper align-items-center">
                <div class="swiper-slide">
                    <img src="assets/img/projects/remodeling-1.jpg" alt="">
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

    </div>
</template>

<script>
export default {
    computed: {
        eventImgList() {
            return this.$store.state.event.fileList;
        }
    }
}
</script>

<style>

</style>