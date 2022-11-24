<template>
  <!-- ======= Features Section ======= -->
  <section id="features" class="features">
    <div class="container" data-aos="fade-up">
      <ul class="nav nav-tabs row g-2 d-flex">
        <li class="nav-item col-6">
          <a class="nav-link active show" data-bs-toggle="tab" data-bs-target="#tab-1" @click="onClickTab(tabName[0])">
            <h4>최근 본 매물</h4>
          </a>
        </li>
        <!-- End tab nav item -->

        <li class="nav-item col-6">
          <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-2" @click="onClickTab(tabName[1])">
            <h4>찜한 매물</h4> </a
          ><!-- End tab nav item -->
        </li>
      </ul>

      <div class="tab-content">
        <div class="tab-pane active show" id="tab-1">
          <recent-pre-view :list="recent"></recent-pre-view>
        </div>
        <!-- End tab content item -->

        <div class="tab-pane" id="tab-2">
          <fav-pre-view></fav-pre-view>
        </div>
        <!-- End tab content item -->
      </div>
    </div>
  </section>
  <!-- End Features Section -->
</template>

<script>
import RecentPreView from "@/components/fav/RecentPreView.vue";
import FavPreView from "@/components/fav/FavPreView.vue";

import http from "@/common/axios.js";
import router from "@/routers/routers.js";

export default {
  components: {
    RecentPreView,
    FavPreView
  },
  data() {
    return {
      recent: [],
      tabName: ['recent', 'fav']
    }
  },
  methods: {
    onClickTab(tabName) {
      if (tabName == 'recent')
        this.recentList();
      else
        this.favList();
    },
    recentList() {
      // 최근 본 매물 localstorage에서 가져오기
      let watched = localStorage.getItem('watched');

      this.recent = [];
      let list = this.$store.state.map.list;
      console.log(list);
      for (let i = 0; i < watched.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (watched[i] == list[j].no) {
            this.recent.push(list[j]);
          }
        }
      }
    },
    async favList() {
      this.$store.dispatch('getUserInfo');
      let params = {
          userSeq: this.$store.state.user.userInfo.userSeq,
      };

      try {
          let { data } = await http.get("/users/fav", { params });  
          console.log(data);
          if (data.result == "login") {
              router.push("/login");
          } else {
              this.$store.commit("SET_FAV_LIST", data.list);
              this.$store.commit("SET_FAV_TOTAL_LIST_ITEM_COUNT", data.count);
          }
      } catch (error) {
          console.error(error);
      }
    }
  },
  created() {
    this.recentList();
  }
};
</script>

<style>

</style>