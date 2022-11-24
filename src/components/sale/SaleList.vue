<template>
  <div>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="input-group mb-3 w-50">
            <select v-model="selectStatus" class="form-select">
              <option value="null">거래유형</option>
              <option value="001">전세</option>
              <option value="002">월세</option>
              <option value="003">매매</option>
            </select>
              <input
                v-model="$store.state.sale.searchWord"
                type="text"
                class="form-control"
              />
              <button @click="saleList" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <button @click="goInsertPage" id="writeBtn" class="btn btn-sm btn-light"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="table-wrap">
              <table class="table table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>거래유형</th>
                    <th>가격</th>
                    <th>건물명</th>
                    <th>최초등록일자</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="cursor: pointer" v-for="(sale, index) in listGetters" :key="index" @click="saleDetail(sale.no)">
                    <th scope="row" :value="sale.no">{{ sale.no }}</th>
                    <td><button class="btn" :class="btnColor(sale)">{{ statusText(sale) }}</button></td>
                    <td>{{sale.saleAmount}}</td>
                    <td>{{sale.AptName}}</td>
                    <td>{{sale.postDate }}</td>
                    <td>{{ summaryDescription(sale.description) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <PaginationUI v-on:call-parent="movePage"></PaginationUI>
      </div>
    </section>
    

  </div>
</template>

<script>
import PaginationUI from "@/components/sale/PaginationUI.vue";
// import InsertModal from "@/components/admin/event/InsertModal.vue";
// import UpdateModal from "@/components/admin/event/UpdateModal.vue";
// import DetailModal from "@/components/admin/event/DetailModal.vue";

// import { Modal } from "bootstrap";

import http from "@/common/axios.js";

import Vue from "vue";
import VueAlertify from "vue-alertify";
Vue.use(VueAlertify);

export default {
  components: {
    PaginationUI,
    // InsertModal,
    // UpdateModal,
    // DetailModal,
  },
  data() {
    return {
      // insertModal: null,
      // detailModal: null,
      // updateModal: null,

      selectStatus: null,
    };
  },
  computed: {
    // gttters 이용
    listGetters() {
      return this.$store.getters.getSaleList;
    },
  },
  methods: {
    goInsertPage(){
      this.$router.push('/sale/insert');
    },
    showDetail(e){
      this.$router.push('/detail/' + e.target.value);
    },
    summaryDescription(description){
      console.log(description.length)
      if(description.length > 20){
        description = description.substr(0, 20) + '...'
      }
      return description
    },
    saleList() {
      //let selectStatus = this.selectStatus;
      this.$store.dispatch("dealerSaleList");
    },
    // pagination
    movePage(pageIndex) {
      // store commit 으로 변경
      // this.offset = (pageIndex - 1) * this.listRowCount;
      // this.currentPageIndex = pageIndex;
      this.$store.commit("SET_SALE_MOVE_PAGE", pageIndex);

      this.saleList();
    },
    // detail
    async saleDetail(eventKey) {
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
    // insert
    showInsertModal() {
        this.insertModal.show();
    },

    closeAfterInsert() {
        this.insertModal.hide();
        this.saleList();
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
        this.saleList();
    },
    changeToDelete() {
        this.detailModal.hide();

        var $this = this; // alertify.confirm-function()에서 this 는 alertify 객체
        this.$alertify.confirmWithTitle(
          "삭제 확인",
          "이 글을 삭제하시겠습니까?",
          function () {
              // board.boardId 사용 X
              $this.saleDelete(); // $this 사용
          },
          function () {
              console.log("cancel");
          }
        );
    },
    async saleDelete() {
         try {
            let { data } = await http.delete("/admins/events/" + this.$store.state.sale.no);
            console.log(data);

            if (data.result == "login") {
               this.doLogout();
            } else {
               this.$alertify.success("글이 삭제되었습니다.");
               this.saleList();
            }
         } catch (error) {
            console.log("AdminEventVue: error : ");
            console.log(error);
         }
    },
    btnColor(sale) {
      return sale.saleTypeCode == '001' ? 'btn-success' : (sale.saleTypeCode == '002' ? 'btn-warning' : 'btn-secondary');
    },
    statusText(sale) {
      return sale.saleTypeCode == '001' ? '전세' : (sale.saleTypeCode == '002' ? '월세' : '매매');
    }
  },
  created() {
    this.saleList();
  },
  // mounted() {
  //   this.insertModal = new Modal(document.getElementById("insertModal"));
  //   this.detailModal = new Modal(document.getElementById("detailModal"));
  //   this.updateModal = new Modal(document.getElementById("updateModal"));
  // },
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
section {
  height: 1000px;
}
</style>
