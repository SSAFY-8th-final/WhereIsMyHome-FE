<template>
  <div>
    <article class="blog-details">
        <div class="post-img">
            <sale-img-slide></sale-img-slide>
        </div>

        <div>
            <h2 class="title">{{this.$store.state.sale.AptName}}</h2>

            <div class="content">
                <div style="padding-top:40px">
                    <h3>가격 정보</h3>
                    <div class="content-item">
                        <li>
                            <div id="key">{{ saleTypeStr }}</div>
                            <div id="value">{{ this.$store.state.sale.saleAmount}}</div>
                        </li>
                        <li>
                            <div id="key">관리비</div>
                            <div id="value">{{ this.$store.state.sale.utilityBill}}</div>
                        </li>
                        <li>
                            <div id="key">주차</div>
                            <div id="value">{{ parkingBill }}</div>
                        </li>
                    </div>
                </div>

                <div style="padding-top:40px">
                    <h3>상세 정보</h3>
                    <div class="content-item">
                        <li>
                            <div id="key">건물이름</div>
                            <div id="value">{{ this.$store.state.sale.AptName }}</div>
                        </li>
                        <li>
                            <div id="key">해당층/건물층</div>
                            <div id="value">{{ this.$store.state.sale.floor }}</div>
                        </li>
                        <li>
                            <div id="key">전용 면적</div>
                            <div id="value">{{this.$store.state.sale.area}} (㎡)</div>
                        </li>
                        <li>
                            <div id="key">방수/욕실</div>
                            <div id="value">{{this.$store.state.sale.room}} / {{this.$store.state.sale.bathroom}}</div>
                        </li>
                        <li>
                            <div id="key">방향</div>
                            <div id="value">{{this.$store.state.sale.direction}}</div>
                        </li>
                        <li>
                            <div id="key">세대당 주차</div>
                            <div id="value">{{ apartPerParking }}</div>
                        </li>
                        <li>
                            <div id="key">준공년도</div>
                            <div id="value">{{ this.$store.state.sale.buildYear }}</div>
                        </li>
                        <li>
                            <div id="key">매물 등록일</div>
                            <div id="value">{{this.$store.state.sale.postDate}}</div>
                        </li>
                    </div>
                </div>
                
                <div style="padding-top:40px">
                    <h3>위치 및 주변 시설</h3>
                    <div class="content-item">
                        <div id="addressStr">
                            <span id="addressRect">주소</span> {{ fullAddress }}
                        </div>
                        <kakao-map-detail></kakao-map-detail>
                    </div>
                </div>

                <div style="padding-top:40px">
                    <h3>상세 설명</h3>
                    <div class="content-item">
                        <p id="description">{{ this.$store.state.sale.description }}</p>
                    </div>
                </div>

            </div><!-- End post content -->

            <div class="meta-bottom">
                <i class="bi bi-clock"></i>
                <ul class="cats">
                    <li><a>&nbsp; {{this.$store.state.sale.postDate}}</a></li>
                </ul>
            </div><!-- End meta bottom -->
        </div>
    </article><!-- End blog post -->

    <div class="post-author d-flex align-items-center">
        <img src="assets/img/blog/blog-author.jpg" class="rounded-circle flex-shrink-0" alt="">
        <div>
            <h4>작성한 공인중개사 id 가져오기</h4>
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
    components: { SaleImgSlide, KakaoMapDetail },
    data() {
        return {
        }
    },
    computed: {
        saleTypeStr() {
            let saleType = this.$store.state.sale.saleTypeCode;
            if (saleType == '001') return '전세'
            else if (saleType == '002') return '월세'
            else return '매매'
        },
        parkingBill() {
            return this.$store.state.sale.parking.split(' ')[0];
        },
        apartPerParking() {
            return this.$store.state.sale.parking.split(' ')[1];
        },
        fullAddress() {
            let dongCode = this.$store.state.sale.dongCode;
            let address = this.$store.getters.getAddressByDongCode(dongCode);
            return address.sido + " " + address.sigungu + " " + address.dong
                + " " + this.$store.state.sale.jibun + " " + this.$store.state.sale.AptName;
        }
    },
    created() {
    }
}
</script>

<style scoped>
.content-item{
    padding-top: 16px;
}
h3 {
    margin-bottom: 16px;
}
.content-item li {
    display: flex;
    padding: 16px 0px;
    line-height: 26px;
    border-bottom: 1px solid rgb(233, 232, 232);
}
#key {
    width: 160px;
    font-size: 16px;
    line-height: 26px;
    font-weight: 600;
}
#value {
    flex-grow: 1;
    font-size: 16px;
    line-height: 26px;
}
#addressRect {
    border: 1px solid rgb(227, 224, 224);
    padding: 2px;
}
#addressStr {
    margin-bottom: 10px;
}
#description {
    background-color: rgb(237, 233, 216);
    padding: 30px;
}
</style>