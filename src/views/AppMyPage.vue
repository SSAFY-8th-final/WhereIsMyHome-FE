<template>
    <div>
         <map-nav-bg></map-nav-bg>
        <!-- ======= Service Details Section ======= -->
    <section id="service-details" class="service-details">
      <div class="container" data-aos="fade-up" data-aos-delay="100">
        <div class="row mt-5 gy-4 mx-4">

            <div class="col-lg-2 mx-4">
                <my-page-nav></my-page-nav>
            </div>
            <div class="col-lg-9 my-4">
                <router-view></router-view>
            </div>
        </div>

      </div>
    </section><!-- End Service Details Section -->
</div>
</template>

<script>
import MapNavBg from "@/components/map/MapNavBg.vue";
import MyPageNav from "@/components/user/UserNavBar.vue";

//import mypageForm from "@/components/mypage/mypageForm.vue";

export default {
    data: function () {
        return{
            
        }
    },
    components: {
        MapNavBg, MyPageNav
    }
}
</script>

<style scoped>
div >>> .service-details{
    padding-top: 20px;
}
.service-details >>> div > h2{
    font-weight: 700;
}
</style>