<template>
    <div>
        <section class="ftco-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="input-group w-50 mb-3">
                        <!-- store 사용 -->
                        <!-- <input v-model="searchWord" @keydown.enter="boardList" type="text" class="form-control"> -->
                        <input
                        v-model="$store.state.notice.searchWord"
                        @keydown.enter="noticeList"
                        type="text"
                        class="form-control"
                        />
                        <button @click="noticeList" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="table-wrap">
                            <table class="table table-borderless">
                                <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>제목</th>
                                    <th>조회수</th>
                                    <th>작성일</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr style="cursor: pointer" v-for="(notice, index) in listGetters" :key="index" @click="noticeDetail(notice.noticeId, index)">
                                        <th scope="row">{{notice.noticeId}}</th>
                                        <td>{{notice.title}}</td>
                                        <td>{{notice.readCount}}</td>
                                        <td>{{notice.regDt.date | makeDateStr("/")}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <PaginationUI v-on:call-parent="movePage"></PaginationUI>
            </div>
        </section>
    
        <!-- Modal -->
        <detail-modal></detail-modal>
    </div>
</template>

<script>
import PaginationUI from "@/components/notice/PaginationUI.vue";
import DetailModal from "@/components/notice/DetailModal.vue";

import { Modal } from "bootstrap";

import http from "@/common/axios.js";
import util from "@/common/util.js";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
    components: {
        PaginationUI,
        DetailModal,
    },
    data() {
        return {
        detailModal: null,
        };
    },
    computed: {
        // gttters 이용
        listGetters() {
            return this.$store.getters.getNoticeList;
        },
    },
    methods: {
        noticeList() {
            this.$store.dispatch("noticeList");
        },
        // pagination
        movePage(pageIndex) {
            // store commit 으로 변경
            // this.offset = (pageIndex - 1) * this.listRowCount;
            // this.currentPageIndex = pageIndex;
            this.$store.commit("SET_NOTICE_MOVE_PAGE", pageIndex);

            this.noticeList();
        },
        // util
        makeDateStr: util.makeDateStr,
        // detail
        async noticeDetail(noticeId, index) {
            this.$store.dispatch('getUserInfo');
            try {
                let params = {
                    userSeq: this.$store.state.user.userInfo.userSeq,
                }
                let { data } = await http.get('/notices/' + noticeId, {params});
                console.log(data);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    let { dto } = data;
                    this.$store.state.notice.list[index].readCount = dto.readCount;
                    this.$store.commit("SET_NOTICE_DETAIL", dto);
                    this.noticeList();
                    this.detailModal.show();
                }
            } catch (error) {
                console.log("AdminNoticeVue: error : ");
                console.log(error);
            }
        },
    },
    created() {
        this.noticeList();
    },
    mounted() {
        this.detailModal = new Modal(document.getElementById("detailModal"));
    },
    filters: {
        makeDateStr: function (date, separator) {
            return date.year + separator + (date.month < 10 ? "0" + date.month : date.month) + separator + (date.day < 10 ? "0" + date.day : date.day);
        },
    },

}
</script>

<style scoped>
.table-wrap {
  overflow-x: scroll;
}
.table {
    border-collapse: collapse;
    border-spacing: 0 10px;
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
}

.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55; }
.table thead th {
    font-size: 14px;
    color: #fff;
}
.table th,
.table td {
    border: none;
    padding: 25px;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    display:table-cell;
    vertical-align:middle;
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6; }
.table tbody + tbody {
    border-top: 2px solid #dee2e6; }
.table tbody tr {
    margin-bottom: 10px;
    -webkit-box-shadow: 0px 5px 12px -12px rgb(0 0 0 / 29%);
    -moz-box-shadow: 0px 5px 12px -12px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 5px 12px -12px rgb(0 0 0 / 29%);
}
/* search bar*/
.input-group input, button {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
.input-group {
  border-bottom: 1px solid black;
}
.input-group >>> button {
  background-color: white;
  padding-left: 5px;
}
section {
  height: 1000px;
}
</style>