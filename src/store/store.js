import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//import jwtDecode from "jwt-decode";

import http from "@/common/axios.js";
import util from "@/common/util.js";

import router from "@/routers/routers.js";

import AddrSido from "@/assets/json/sido.json"
import AddrSigungu from "@/assets/json/sigungu.json"
import AddrDong from "@/assets/json/dong.json"

export default new Vuex.Store({
  state: {
    pagination: {
      listRowCount: 10,
      pageLinkCount: 10,
      currentPageIndex: 1,
    },
         // login, NavBar
    user: {
      isLogin: false,

      userInfo: null,
      isValidToken: false,

      // Login
      userInput: {
        userEmail: '',
        userPassword: ''
      }
    },

    map: {
        list:[], // houseDto
        gugunCode: '',
        dongCode: '',
        searchWord: ''
    },
    event: {
      list: [],
      limit: 10,
      offset: 0,
      searchWord: "",

      totalListItemCount: 0,

      // detail
      eventKey: 0,
      name: "",
      category: "",
      content: "",
      startDateTime: "",
      endDateTime: "",
      url: "",
      statusCode: "",
      registerId: "",
      registerDateTime: "",
      readCount: 0,
      attendCount: 0,
      sameUser: false,
      isAttend: false,
      fileList: [],
    },
    notice: {
      // list
      list: [],
      limit: 10,
      offset: 0,
      searchWord: "",

      totalListItemCount: 0,

      // detail, update, delete

      noticeId: 0,
      title: "",
      content: "",
      userEmail: "",
      regDt: "",
      regDate: "",
      regTime: "",
      readCount: 0,
      fileList: [],
      isAdmin: false,
    },
    address: {
      setInterestCode: false,
      sidoSelect: '11',
      sigunguSelect: null,
      dongSelect: null,

      sido: AddrSido,
      sigungu: AddrSigungu,
      dong: AddrDong,
    }
  },
    mutations: {
      SET_IS_LOGIN: (state, isLogin) => {
        state.user.isLogin = isLogin;
      },
      SET_IS_VALID_TOKEN: (state, isValidToken) => {
        state.user.isValidToken = isValidToken;
      },
      SET_USER_INFO: (state, userInfo) => {
        state.user.isLogin = true;
        state.user.userInfo = userInfo;
      },

      SET_EVENT_LIST(state, list) {
        state.event.list = list;
      },
      SET_ADMIN_EVENT_TOTAL_LIST_ITEM_COUNT(state, count) {
        state.event.totalListItemCount = count;
      },
      SET_EVENT_DETAIL(state, payload) {
        state.event.eventKey = payload.eventKey;
        state.event.name = payload.name;
        state.event.category = payload.category;
        state.event.content = payload.content;
        state.event.startDateTime = payload.startDateTime;
        state.event.startDate = util.makeDateStr(
          payload.startDateTime.date.year,
          payload.startDateTime.date.month,
          payload.startDateTime.date.day,
          "."
        );
        state.event.startTime = util.makeDateStr(
          payload.startDateTime.time.hour,
          payload.startDateTime.time.minute,
          payload.startDateTime.time.second,
          ":"
        );
        state.event.endDateTime = payload.endDateTime;
        state.event.endDate = util.makeDateStr(
          payload.endDateTime.date.year,
          payload.endDateTime.date.month,
          payload.endDateTime.date.day,
          "."
        );
        state.event.endTime = util.makeDateStr(
          payload.endDateTime.time.hour,
          payload.endDateTime.time.minute,
          payload.endDateTime.time.second,
          ":"
        );
        state.event.statusCode = payload.statusCode;
        state.event.registerId = payload.registerId;
        state.event.registerDate = util.makeDateStr(
          payload.registerDateTime.date.year,
          payload.registerDateTime.date.month,
          payload.registerDateTime.date.day,
          "."
        );
        state.event.registerTime = util.makeDateStr(
          payload.registerDateTime.time.hour,
          payload.registerDateTime.time.minute,
          payload.registerDateTime.time.second,
          ":"
        );
        state.event.fileList = payload.fileList;
        state.event.readCount = payload.readCount;
        state.event.attendCount = payload.attendCount;
        state.event.isAttend = payload.isAttend;
        state.event.sameUser = payload.sameUser;
      },
      SET_EVENT_NAME(state, name) {
        state.event.name = name;
      },
      SET_EVENT_CATEGORY(state, category) {
        state.event.category = category;
      },
      SET_EVENT_ISATTEND(state, isAttend) {
        state.event.isAttend = isAttend;
      },
      SET_EVENT_ATTENDCOUNT(state, count) {
        state.event.attendCount += count;
      },
      /* notice */
      SET_NOTICE_LIST(state, list) {
        state.notice.list = list;
      },
  
      SET_NOTICE_TOTAL_LIST_ITEM_COUNT(state, count) {
        state.notice.totalListItemCount = count;
      },
  
      SET_NOTICE_MOVE_PAGE(state, pageIndex) {
        state.notice.offset = (pageIndex - 1) * state.pagination.listRowCount;
        state.pagination.currentPageIndex = pageIndex;
      },
  
      SET_NOTICE_DETAIL(state, payload) {
        state.notice.noticeId = payload.noticeId;
        state.notice.title = payload.title;
        state.notice.content = payload.content;
        state.notice.userEmail = payload.userEmail;
        state.notice.regDate = util.makeDateStr(
          payload.regDt.date.year,
          payload.regDt.date.month,
          payload.regDt.date.day,
          "."
        );
        state.notice.regTime = util.makeTimeStr(
          payload.regDt.time.hour,
          payload.regDt.time.minute,
          payload.regDt.time.second,
          ":"
        );
        state.notice.readCount = payload.readCount;
        state.notice.sameUser = payload.sameUser;
      },
      // for UpdateModal title v-modal
      SET_NOTICE_TITLE(state, title) {
        state.notice.title = title;
      },
      SET_EVENT_MOVE_PAGE(state, pageIndex) {
        state.event.offset = (pageIndex - 1) * state.pagination.listRowCount;
        state.pagination.currentPageIndex = pageIndex;
      },
      /* selected address */
      SET_SIDO_SELECT(state, sido) {
        state.address.sidoSelect = sido;
      },
      SET_SIGUNGU_SELECT(state, sigungu) {
        state.address.sigunguSelect = sigungu;
      },
      SET_DONG_SELECT(state, dong) {
        state.address.dongSelect = dong;
      },
      SET_INTEREST_CODE(state, flag) {
        state.address.setInterestCode = flag;
    }
    },
    actions: {
      async noticeList(context) {
        let params = {
          limit: this.state.notice.limit,
          offset: this.state.notice.offset,
          searchWord: this.state.notice.searchWord,
        };
  
        try {
          let { data } = await http.get("/admins/notices", { params }); // params: params shorthand property, let response 도 제거
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
      async adminEventList(context, { selectStatus }) {
        let params = {
          limit: this.state.event.limit,
          offset: this.state.event.offset,
          searchWord: this.state.event.searchWord,
          option: selectStatus,
        };
  
        try {
          let { data } = await http.get("/admins/events", { params }); // params: params shorthand property, let response 도 제거
          console.log(data);
          if (data.result == "login") {
            router.push("/login");
          } else {
            context.commit("SET_EVENT_LIST", data.list);
            context.commit("SET_ADMIN_EVENT_TOTAL_LIST_ITEM_COUNT", data.count);
          }
        } catch (error) {
          console.error(error);
        }
      },
      async login(context, payload) {
         
        try {
           console.log(payload)
           let response = await http.post('/login', JSON.stringify(payload))
           let { data } = response
           console.log(response.status);

           let statusCode = response.status;
           if (statusCode == 200) {
              context.commit("SET_IS_LOGIN", true);
              context.commit("SET_IS_VALID_TOKEN", true);
              sessionStorage.setItem("access-token", data.accessToken);
              sessionStorage.setItem("refresh-token", data.refreshToken);
           } else if (statusCode == 401) {
              context.commit("SET_IS_LOGIN", false);
              context.commit("SET_IS_VALID_TOKEN", false);
              alert("아이디 또는 비밀번호 잘못 입력")
           } else {
              alert("사이트 오류")
           }

        } catch (error) {
           console.log(error);
        }
     },
    },
    getters: {
      isLogin: function (state) {
        return state.user.isLogin;
      },
     checkUserInfo: function (state) {
        return state.user.userInfo;
      },
      checkToken: function (state) {
        return state.isValidToken;
      },
      getEventList: function (state) {
        return state.event.list;
      },
      getNoticeList: function (state) {
        return state.notice.list;
      },
  
      // pagination
      getPageCount: function (state) {
        return Math.ceil(state.pagination.totalListItemCount / state.pagination.listRowCount);
      },
      getStartPageIndex: function (state) {
        if (state.pagination.currentPageIndex % state.pagination.pageLinkCount == 0) {
          //10, 20...맨마지막
          return (
            (state.pagination.currentPageIndex / state.pagination.pageLinkCount - 1) *
              state.pagination.pageLinkCount +
            1
          );
        } else {
          return (
            Math.floor(state.pagination.currentPageIndex / state.pagination.pageLinkCount) *
              state.pagination.pageLinkCount +
            1
          );
        }
      },
      getEndPageIndex: function (state, getters) {
        let ret = 0;
        if (state.pagination.currentPageIndex % state.pagination.pageLinkCount == 0) {
          //10, 20...맨마지막
          ret =
            (state.pagination.currentPageIndex / state.pagination.pageLinkCount - 1) *
              state.pagination.pageLinkCount +
            state.pagination.pageLinkCount;
        } else {
          ret =
            Math.floor(state.pagination.currentPageIndex / state.pagination.pageLinkCount) *
              state.pagination.pageLinkCount +
            state.pagination.pageLinkCount;
        }
        // 위 오류나는 코드를 아래와 같이 비교해서 처리
        return ret > getters.getPageCount ? getters.getPageCount : ret;
      },
      getPrev: function (state) {
        if (state.pagination.currentPageIndex <= state.pagination.pageLinkCount) {
          return false;
        } else {
          return true;
        }
      },
      getNext: function (state, getters) {
        if (
          Math.floor(getters.getPageCount / state.pagination.pageLinkCount) *
            state.pagination.pageLinkCount <
          state.pagination.currentPageIndex
        ) {
          return false;
        } else {
          return true;
        }
      },
      //  getSidoList: function (state) {
      //     return state.address.sido;
      //    },
      getFilteredSigungu: function (state) {
        return state.address.sigungu.filter(
          (item) => item.code.substr(0, 2) == state.address.sidoSelect
        );
      },
      getFilteredDong: function (state) {
        return state.address.dong.filter(
          (item) => item.code.substr(0, 5) == state.address.sigunguSelect
        );
      },
    },
    })
