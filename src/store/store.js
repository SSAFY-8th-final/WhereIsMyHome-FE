import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import http from "@/common/axios.js";
import util from "@/common/util.js";

import router from "@/routers/routers.js";

export default new Vuex.Store({
    state: {
        userInfo: {
            favArea: ''
        },
        map: {
            list:[], // houseDto
            gugunCode: '',
            dongCode: '',
            searchWord: ''
        },
        event: {
            list: [],
             
            // detail
            eventKey: 0,
            name: "",
            startDateTime: "",
            endDateTime: "",
            url: "",
            statusCode: "",
            registerId: "",
            registerDateTime: "",
            sameUser: false
        },
        notice: {
            // list
            list: [],
            limit: 10,
            offset: 0,
            searchWord: "",
   
            // pagination
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,
   
            totalListItemCount: 0,
   
            // detail, update, delete
   
            boardId: 0,
            title: "",
            content: "",
            userName: "",
            regDate: "",
            regTime: "",
            readCount: 0,
            fileList: [],
            isAdmin: false,
         },
    },
    mutations: {
        SET_NOTICE_LIST(state, list) {
            state.notice.list = list;
         },
   
         SET_NOTICE_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.notice.totalListItemCount = count;
         },
   
         SET_NOTICE_MOVE_PAGE(state, pageIndex) {
            state.notice.offset = (pageIndex - 1) * state.notice.listRowCount;
            state.notice.currentPageIndex = pageIndex;
         },
   
         SET_NOTICE_DETAIL(state, payload) {
            state.notice.boardId = payload.boardId;
            state.notice.title = payload.title;
            state.notice.content = payload.content;
            state.notice.userName = payload.userName;
            state.notice.regDate = util.makeDateStr(payload.regDt.date.year, payload.regDt.date.month, payload.regDt.date.day, ".");
            state.notice.regTime = util.makeTimeStr(payload.regDt.time.hour, payload.regDt.time.minute, payload.regDt.time.second, ":");
            state.notice.readCount = payload.readCount;
            state.notice.fileList = payload.fileList;
            state.notice.sameUser = payload.sameUser;
         },
         // for UpdateModal title v-modal
         SET_NOTICE_TITLE(state, title) {
            state.notice.title = title;
         },
    },
    actions: {
        async noticeList(context) {
            let params = {
               limit: this.state.notice.limit,
               offset: this.state.notice.offset,
               searchWord: this.state.notice.searchWord,
            };
   
            try {
               let { data } = await http.get("/notices", { params }); // params: params shorthand property, let response 도 제거
               console.log(data);
               if (data.result == "login") {
                  router.push("/login");
               } else {
                  context.commit("SET_NOTICE_LIST", data.list);
                  context.commit("SET_NOTICE_TOTAL_LIST_ITEM_COUNT", data.count);
               }
            } catch (error) {
               console.error(error);
            }
         },
    },
    getters: {
        getNoticeList: function (state) {
            return state.notice.list;
         },
   
         // pagination
         getPageCount: function (state) {
            return Math.ceil(state.notice.totalListItemCount / state.notice.listRowCount);
         },
         getStartPageIndex: function (state) {
            if (state.notice.currentPageIndex % state.notice.pageLinkCount == 0) {
               //10, 20...맨마지막
               return (state.notice.currentPageIndex / state.notice.pageLinkCount - 1) * state.notice.pageLinkCount + 1;
            } else {
               return Math.floor(state.notice.currentPageIndex / state.notice.pageLinkCount) * state.notice.pageLinkCount + 1;
            }
         },
         getEndPageIndex: function (state, getters) {
            let ret = 0;
            if (state.notice.currentPageIndex % state.notice.pageLinkCount == 0) {
               //10, 20...맨마지막
               ret = (state.notice.currentPageIndex / state.notice.pageLinkCount - 1) * state.notice.pageLinkCount + state.notice.pageLinkCount;
            } else {
               ret = Math.floor(state.notice.currentPageIndex / state.notice.pageLinkCount) * state.notice.pageLinkCount + state.notice.pageLinkCount;
            }
            // 위 오류나는 코드를 아래와 같이 비교해서 처리
            return ret > getters.getPageCount ? getters.getPageCount : ret;
         },
         getPrev: function (state) {
            if (state.notice.currentPageIndex <= state.notice.pageLinkCount) {
               return false;
            } else {
               return true;
            }
         },
         getNext: function (state, getters) {
            if (Math.floor(getters.getPageCount / state.notice.pageLinkCount) * state.notice.pageLinkCount < state.notice.currentPageIndex) {
               return false;
            } else {
               return true;
            }
         },
    }

})