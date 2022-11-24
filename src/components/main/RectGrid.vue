<template>
  <!-- ======= Services Section ======= -->
  <section id="services" class="services section-bg">
    <section-header
      id="serviceTitle"
      :title="title"
      description="편의시설"
    ></section-header>
    <div class="container" data-aos="fade-up">
      <div class="row gy-4">
        <div class="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="service-item position-relative">
            <div class="icon mb-4">
              <i class="fa-sharp fa-solid fa-store"></i>
            </div>
            <h3>편의점</h3>
            <div class="icon-content">{{ this.list[0] }}</div>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="200">
          <div class="service-item position-relative">
            <div class="icon mb-4">
              <i class="fa-solid fa-piggy-bank"></i>
            </div>
            <h3>은행</h3>
            <div class="icon-content">{{ this.list[1] }}</div>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="300">
          <div class="service-item position-relative">
            <div class="icon mb-4">
              <i class="fa-sharp fa-solid fa-building-columns"></i>
            </div>
            <h3>관공서</h3>
            <div class="icon-content">{{ this.list[2] }}</div>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="400">
          <div class="service-item position-relative">
            <div class="icon mb-4">
              <i class="fa-solid fa-dumbbell"></i>
            </div>
            <h3>마트</h3>
            <div class="icon-content">{{ this.list[3] }}</div>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="500">
          <div class="service-item position-relative">
            <div class="icon mb-4">
              <i class="fa-solid fa-school"></i>
            </div>
            <h3>학교</h3>
            <div class="icon-content">{{ this.list[4] }}</div>
          </div>
        </div>
        <!-- End Service Item -->

        <div class="col-lg-2 col-md-6" data-aos="fade-up" data-aos-delay="600">
          <div class="service-item position-relative">
            <div class="icon mb-4">
              <i class="fa-sharp fa-solid fa-square-parking"></i>
            </div>
            <h3>주차장</h3>
            <div class="icon-content">{{ this.list[5] }}</div>
          </div>
        </div>
        <!-- End Service Item -->
      </div>
    </div>
  </section>
  <!-- End Services Section -->
</template>

<script>
import SectionHeader from "@/components/main/SectionHeader.vue";
export default {
  components: {
    SectionHeader,
  },
  data: function () {
    return {
      list: ['-','-','-','-','-','-'],
      title: ''

    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  async created() {
    if (this.isLogin) {
      let data = await this.$store.dispatch("dongInfo");
      this.list = data.list;
      this.title = data.dong + '은 어떤 동네일까요?'
    }
  },

};
</script>

<style scoped>
#services >>> #serviceTitle {
  padding-top: 0px !important;
  padding-bottom: 60px;
}

.row > * {
  padding-right: calc(1.5rem * 0.5);
  padding-left: calc(1.5rem * 0.5);
}
.service-item >>> .icon-content {
  font-size: 2.5em;
  font-weight: 800;
}
</style>
