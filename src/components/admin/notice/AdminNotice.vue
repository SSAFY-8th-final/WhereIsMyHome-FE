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
                    <button id="writeBtn" class="btn btn-sm btn-light" @click="showInsertModal"><i class="fa-solid fa-pen-to-square"></i></button>
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
                                    <th>작성자</th>
                                    <th>작성일</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style="cursor: pointer" v-for="(notice, index) in listGetters" :key="index" @click="noticeDetail(notice.noticeId)">
                                    <th scope="row">{{notice.noticeId}}</th>
                                    <td>{{notice.title}}</td>
                                    <td>{{notice.readCount}}</td>
                                    <td>{{notice.userEmail}}</td>
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
        <insert-modal v-on:call-parent-insert="closeAfterInsert"></insert-modal>
        <detail-modal v-on:call-parent-change-to-update="changeToUpdate" v-on:call-parent-change-to-delete="changeToDelete"></detail-modal>
        <update-modal v-on:call-parent-update="closeAfterUpdate"></update-modal>
    </div>
</template>

<script>
import PaginationUI from "@/components/PaginationUI.vue";
import InsertModal from "@/components/admin/notice/InsertModal.vue";
import UpdateModal from "@/components/admin/notice/UpdateModal.vue";
import DetailModal from "@/components/admin/notice/DetailModal.vue";

import { Modal } from "bootstrap";

import http from "@/common/axios.js";
import util from "@/common/util.js";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
    components: {
        PaginationUI,
        InsertModal,
        UpdateModal,
        DetailModal,
    },
    data() {
        return {
        insertModal: null,
        detailModal: null,
        updateModal: null,
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
        async noticeDetail(noticeId) {
            try {
                let { data } = await http.get('/admins/notices/' + noticeId);
                console.log(data);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    let { dto } = data;
                    this.$store.commit("SET_NOTICE_DETAIL", dto);

                    this.detailModal.show();
                }
            } catch (error) {
                console.log("AdminNoticeVue: error : ");
                console.log(error);
            }
        },
        // insert
        showInsertModal() {
            this.insertModal.show();
        },

        closeAfterInsert() {
            this.insertModal.hide();
            this.noticeList();
        },
        // update
        changeToUpdate() {
            this.detailModal.hide();
            this.updateModal.show();
        },
        closeAfterUpdate() {
            this.updateModal.hide();
            this.noticeList();
        },
        changeToDelete() {
            this.detailModal.hide();

            var $this = this; // alertify.confirm-function()에서 this 는 alertify 객체
            this.$alertify.confirmWithTitle(
            "삭제 확인",
            "이 글을 삭제하시겠습니까?",
            function () {
                // board.boardId 사용 X
                $this.noticeDelete(); // $this 사용
            },
            function () {
                console.log("cancel");
            }
            );
        },
        async noticeDelete() {
            try {
                let { data } = await http.delete("/admins/notices/" + this.$store.state.notice.noticeId);
                console.log(data);

                if (data.result == "login") {
                this.doLogout();
                } else {
                this.$alertify.success("글이 삭제되었습니다.");
                this.noticeList();
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
        this.insertModal = new Modal(document.getElementById("insertModal"));
        this.detailModal = new Modal(document.getElementById("detailModal"));
        this.updateModal = new Modal(document.getElementById("updateModal"));
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
/* write button */
#writeBtn {
  margin-top: 20px;
}
</style>