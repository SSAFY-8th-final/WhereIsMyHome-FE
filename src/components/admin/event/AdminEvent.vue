<template>
  <div>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="input-group mb-3 w-50">
            <select class="form-select" aria-label="Default select example">
              <option selected>Option</option>
              <option value="1">진행중</option>
              <option value="2">예정</option>
              <option value="3">종료</option>
            </select>
              <input
                v-model="$store.state.event.searchWord"
                @keydown.enter="eventList"
                type="text"
                class="form-control"
              />
            <button @click="eventList" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-wrap">
              <table class="table table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>이벤트명</th>
                    <th>시작일</th>
                    <th>종료일</th>
                    <th>작성자</th>
                    <th>진행상태</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="cursor: pointer" v-for="(event, index) in listGetters" :key="index" @click="eventDetail(event.eventKey)">
                    <th scope="row">{{ event.eventKey }}</th>
                    <td>{{ event.name }}</td>
                    <td>{{ event.startDateTime }}</td>
                    <td>{{ event.endDateTime }}</td>
                    <td>{{ event.registerId }}</td>
                    <td><button class="btn btn-danger">On hold</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PaginationUI v-on:call-parent="movePage"></PaginationUI>
        <button class="btn btn-sm btn-primary" @click="showInsertModal">글쓰기</button>
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
import InsertModal from "@/components/admin/event/InsertModal.vue";
import UpdateModal from "@/components/admin/event/UpdateModal.vue";
import DetailModal from "@/components/admin/event/DetailModal.vue";

import { Modal } from "bootstrap";

import http from "@/common/axios.js";
// import util from "@/common/util.js";

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
      return this.$store.getters.getEventList;
    },
  },
  methods: {
    eventList() {
      this.$store.dispatch("eventList");
    },
    // pagination
    movePage(pageIndex) {
      // store commit 으로 변경
      // this.offset = (pageIndex - 1) * this.listRowCount;
      // this.currentPageIndex = pageIndex;
      this.$store.commit("SET_EVENT_MOVE_PAGE", pageIndex);

      this.eventList();
    },
    // detail
    async eventDetail(eventKey) {
      try {
        let { data } = await http.get('/admins/events/' + eventKey);
        console.log(data);

        if (data.result == "login") {
            this.doLogout(); // this.$router.push("/login"); 에서 변경
        } else {
            let { dto } = data;
            this.$store.commit("SET_EVENT_DETAIL", dto);

            this.detailModal.show();
        }
      } catch (error) {
          console.log("AdminEventVue: error : ");
          console.log(error);
      }
    },
    // insert
    showInsertModal() {
        this.insertModal.show();
    },

    closeAfterInsert() {
        this.insertModal.hide();
        this.eventList();
    },
    // update
    changeToUpdate() {
        // board parameter 필요 없음.
        // data update 사용 X
        // this.board = board;
        this.detailModal.hide();
        this.updateModal.show();
    },
    closeAfterUpdate() {
        this.updateModal.hide();
        this.eventList();
    },
    changeToDelete() {
        this.detailModal.hide();

        var $this = this; // alertify.confirm-function()에서 this 는 alertify 객체
        this.$alertify.confirmWithTitle(
          "삭제 확인",
          "이 글을 삭제하시겠습니까?",
          function () {
              // board.boardId 사용 X
              $this.eventDelete(); // $this 사용
          },
          function () {
              console.log("cancel");
          }
        );
    },
    async eventDelete() {
         try {
            let { data } = await http.delete("/events/" + this.$store.state.event.eventKey);
            console.log(data);

            if (data.result == "login") {
               this.doLogout();
            } else {
               this.$alertify.success("글이 삭제되었습니다.");
               this.eventList();
            }
         } catch (error) {
            console.log("AdminEventVue: error : ");
            console.log(error);
         }
      },
  },
  created() {
    this.eventList();
  },
  mounted() {
    this.insertModal = new Modal(document.getElementById("insertModal"));
    this.detailModal = new Modal(document.getElementById("detailModal"));
    this.updateModal = new Modal(document.getElementById("updateModal"));
  },
};
</script>

<style scoped>
/* table */
.table-wrap {
  overflow-x: scroll;
}

.table .thead-dark th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
}
.table th,
.table td {
    border: none;
    padding: 20px;
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
.input-group input, select, button {
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
</style>
