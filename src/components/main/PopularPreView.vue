<template>
  <!-- ======= Recent Blog Posts Section ======= -->
  <section id="recent-blog-posts" class="recent-blog-posts">
    <section-header id="serviceTitle" title="인기 매물" :description="description"></section-header>

    <div class="container" data-aos="fade-up">
      <div class="row gy-5">
        <PreviewUI :el="popular" v-for="(popular, index) in this.list" :key="index"></PreviewUI>
      </div>
    </div>
  </section>
  <!-- End Recent Blog Posts Section -->
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
import PreviewUI from "@/components/PreViewUI.vue";
import http from "@/common/axios.js";

export default {
  components: {
    PreviewUI,
    SectionHeader
  },
  data() {
    return {
      list: [],
      description: "",
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    listGetters() {
      return this.$store.getters.getPopularSale;
    }
  },
  async created() {
    let dongCode = "1165010700"; // 반포동
    if (this.isLogin) {
      dongCode = this.$store.state.user.userInfo.interestCode;
    }

    // 동 코드로 전체 지역명 가져오기
    let address = this.$store.getters.getAddressByDongCode(dongCode);
    this.description = address.sido + " " + address.sigungu + " " + address.dong;

    // 해당 동에서 찜이 많은 매물 가져오기
    try {
      let { data } = await http.get('/sales/popular/' + dongCode);
      console.log(data);
      this.list = data.list;
    } catch (error) {
      console.log(error);
    }

  },
};
</script>

<style scoped>
#services >>> #serviceTitle {
  padding-top: 0px !important;
  padding-bottom: 60px;
}
.section-header {
  margin-bottom: 60px;
}
.container .row {
  margin-bottom: 60px;
}
.row > * {
  padding-right: calc(1.5rem * .5);
  padding-left: calc(1.5rem * .5);
}
</style>
