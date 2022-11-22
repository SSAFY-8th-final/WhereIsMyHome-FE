<template>
  <div>
    <article class="blog-details">
        <div class="post-img">
            <sale-img-slide></sale-img-slide>
        </div>

        <div>
            <h2 class="title">apt name</h2>

            <div class="content">
                <h3>가격 정보</h3>
                <div class="content-item">
                    <p>매물 유형</p>
                    <p>관리비</p>
                    <p>주차</p>
                </div>

                <h3>상세 정보</h3>
                <div class="content-item">
                    <p>건물이름</p>
                    <p>해당층/건물층</p>
                    <p>전용 면적</p>
                    <p>방수/욕실</p>
                    <p>방향</p>
                    <p>세대당 주차</p>
                    <p>준공년도</p>
                    <p>매물 등록일</p>
                </div>
                

                <h3>위치 및 주변 시설</h3>
                <div class="content-item">
                    <p>주소</p>
                    <kakao-map-detail></kakao-map-detail>
                </div>

                <h3>상세 설명</h3>
                <div class="content-item">
                    <p>설명</p>
                </div>

            </div><!-- End post content -->

            <div class="meta-bottom">
                <i class="bi bi-clock"></i>
                <ul class="cats">
                    <li><a>&nbsp; Jan 1, 2022</a></li>
                </ul>
            </div><!-- End meta bottom -->
        </div>
    </article><!-- End blog post -->

    <div class="post-author d-flex align-items-center">
        <img src="assets/img/blog/blog-author.jpg" class="rounded-circle flex-shrink-0" alt="">
        <div>
            <h4>Jane Smith</h4>
            <div class="social-links">
            <a href="https://twitters.com/#"><i class="bi bi-twitter"></i></a>
            <a href="https://facebook.com/#"><i class="bi bi-facebook"></i></a>
            <a href="https://instagram.com/#"><i class="biu bi-instagram"></i></a>
            </div>
            <p>
            Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
            </p>
        </div>
    </div><!-- End post author -->
  </div>
</template>

<script>
import SaleImgSlide from "@/components/sale/SaleImgSlide.vue";
import KakaoMapDetail from "@/components/map/KakaoMapDetail.vue";
export default {
    components: {SaleImgSlide, KakaoMapDetail},
    data() {
        return {
            saleInfo: this.$store.state.sale.saleInfo
        }
    },
}
</script>

<style scoped>
.content-item{
    margin: 15px 20px;
}

</style>