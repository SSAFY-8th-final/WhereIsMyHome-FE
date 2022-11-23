<template>
  <div class="position-relative h-50">
        <div class="slides-1 portfolio-details-slider swiper">
            <div class="swiper-wrapper align-items-center">
                <div class="swiper-slide overflow-hidden" >
                    <img src="/assets/img/flower.jpg" alt="">
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

<style scoped>
img {
    height: 600px;
    object-fit: cover;
}

</style>