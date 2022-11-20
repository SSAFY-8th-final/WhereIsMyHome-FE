<template>
  <div>
    <bread-crumbs title="이벤트"></bread-crumbs>
    <image-grid></image-grid>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import ImageGrid from "@/components/event/ImageGrid.vue";
import http from "@/common/axios.js";
import router from "@/routers/routers.js";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  components: {
    BreadCrumbs,
    ImageGrid,
  },
  methods: {
    async eventList() {
      try {
        let { data } = await http.get("/events"); // params: params shorthand property, let response 도 제거
        console.log(data);
        if (data.result == "login") {
          router.push("/login");
        } else {
          this.afterEventList(data.list);
          
        }
      } catch (error) {
        console.error(error);
      }
    },
    afterEventList(list) {
      for (const idx in list) {
        if (list[idx].statusCode == '001')
          list[idx].filter = 'filter-proceeding'
        else if (list[idx].statusCode == '002')
          list[idx].filter = 'filter-expected'
        else
          list[idx].filter = 'filter-end'
      }

      this.$store.commit("SET_EVENT_LIST", list);
    }
  },
  created() {
    this.eventList();
  }
};
</script>

<style>
  
</style>
