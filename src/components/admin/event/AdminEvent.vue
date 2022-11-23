<template>
  <div>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="input-group mb-3 w-50">
            <select v-model="selectStatus" class="form-select">
              <option selected>Option</option>
              <option value="001">진행중</option>
              <option value="002">예정</option>
              <option value="003">종료</option>
            </select>
              <input
                v-model="$store.state.event.searchWord"
                @keydown.enter="eventList"
                type="text"
                class="form-control"
              />
              <button @click="eventList" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <button id="writeBtn" class="btn btn-sm btn-light" @click="showInsertModal"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-wrap">
              <table class="table table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>진행상태</th>
                    <th>이벤트명</th>
                    <th>조회수</th>
                    <th>작성자</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="cursor: pointer" v-for="(event, index) in listGetters" :key="index" @click="eventDetail(event.eventKey)">
                    <th scope="row">{{ event.eventKey }}</th>
                    <td><button class="btn" :class="btnColor(event)">{{ statusText(event) }}</button></td>
                    <td>{{ event.name }}</td>
                    <td>{{ event.readCount }}</td>
                    <td>{{ event.registerId }}</td>
                    <td>{{ event.registerDateTime.date | makeDateStr("/") }}</td>
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
import PaginationUI from "@/components/admin/event/PaginationUI.vue";
import InsertModal from "@/components/admin/event/InsertModal.vue";
import UpdateModal from "@/components/admin/event/UpdateModal.vue";
import DetailModal from "@/components/admin/event/DetailModal.vue";

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

      selectStatus: '',
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
      let selectStatus = this.selectStatus;
      this.$store.dispatch("adminEventList", {selectStatus});
    },
    // pagination
    movePage(pageIndex) {
      // store commit 으로 변경
      // this.offset = (pageIndex - 1) * this.listRowCount;
      // this.currentPageIndex = pageIndex;
      this.$store.commit("SET_EVENT_MOVE_PAGE", pageIndex);

      this.eventList();
    },
    // util
    makeDateStr: util.makeDateStr,
    // detail
    async eventDetail(eventKey) {
      try {
        this.$store.dispatch('getUserInfo');
        let params = {
          userEmail: this.$store.state.user.userInfo.userEmail,
          eventKey
        }

        let { data } = await http.get('/admins/events/' + eventKey, {params});
        console.log(data);

        if (data.result == "login") {
            this.doLogout(); // this.$router.push("/login"); 에서 변경
        } else {
            let { dto } = data;
            var startDate = new Date(dto.startDateTime);
            var endDate = new Date(dto.endDateTime);
            dto.formatedStart = this.dateFormat(startDate);
            dto.formatedEnd = this.dateFormat(endDate);
            this.$store.commit("SET_EVENT_DETAIL", dto);
            this.detailModal.show();
        }
      } catch (error) {
          console.log("AdminEventVue: error : ");
          console.log(error);
      }
    },
    dateFormat(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      month = month >= 10 ? month : '0' + month;
      day = day >= 10 ? day : '0' + day;
      hour = hour >= 10 ? hour : '0' + hour;
      minute = minute >= 10 ? minute : '0' + minute;
      second = second >= 10 ? second : '0' + second;

      return date.getFullYear() + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
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
            let { data } = await http.delete("/admins/events/" + this.$store.state.event.eventKey);
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
    btnColor(event) {
      return event.statusCode == '001' ? 'btn-success' : (event.statusCode == '002' ? 'btn-warning' : 'btn-secondary');
    },
    statusText(event) {
      return event.statusCode == '001' ? '진행중' : (event.statusCode == '002' ? '예정' : '종료');
    }
  },
  created() {
    this.eventList();
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
#writeBtn {
  margin-top: 20px;
}
</style>
