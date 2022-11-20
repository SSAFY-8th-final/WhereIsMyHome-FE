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
         //
         board: {
            // list
            list:[ // item for test
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },
            {
               title: 'apt1',
               dealAmount: '20,000',
               userName: '124.17',
               floor: 2,
               boardId: 2
            },

         
         ], // houseDto
            limit: 10,
            offset: 0,
            searchWord: "",

            // pagination
            listRowCount: 10,
            pageLinkCount: 10,
            currentPageIndex: 1,

            totalListItemCount: 17,

            // detail, update, delete

            boardId: 0,
            title: "",
            content: "",
            userName: "",
            regDate: "",
            regTime: "",
            readCount: 0,
            fileList: [],
            sameUser: false,
         },

         //////////////////////
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
            limit: 10,
            offset: 0,
            searchWord: "",
             
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

      SET_BOARD_LIST(state, list) {
         state.board.list = list;
      },

      SET_BOARD_TOTAL_LIST_ITEM_COUNT(state, count) {
         state.board.totalListItemCount = count;
      },

      SET_BOARD_MOVE_PAGE(state, pageIndex) {
         state.board.offset = (pageIndex - 1) * state.board.listRowCount;
         state.board.currentPageIndex = pageIndex;
      },

      SET_BOARD_DETAIL(state, payload) {
         state.board.boardId = payload.boardId;
         state.board.title = payload.title;
         state.board.content = payload.content;
         state.board.userName = payload.userName;
         state.board.regDate = util.makeDateStr(payload.regDt.date.year, payload.regDt.date.month, payload.regDt.date.day, ".");
         state.board.regTime = util.makeTimeStr(payload.regDt.time.hour, payload.regDt.time.minute, payload.regDt.time.second, ":");
         state.board.readCount = payload.readCount;
         state.board.fileList = payload.fileList;
         state.board.sameUser = payload.sameUser;
      },
      // for UpdateModal title v-modal
      SET_BOARD_TITLE(state, title) {
         state.board.title = title;
      },
      ///////////////////////////
         /* event */
        SET_EVENT_LIST(state, list) {
            state.event.list = list;
        },
        SET_EVENT_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.event.totalListItemCount = count;
        },
        /* notice */
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
         
       /* selected address */
       SET_SIDO_SELECT(state, sido) {
            state.address.sidoSelect = sido
       },
       SET_SIGUNGU_SELECT(state, sigungu) {
         state.address.sigunguSelect = sigungu
       },
       SET_DONG_SELECT(state, dong) {
         state.address.dongSelect = dong
       },
       SET_INTEREST_CODE(state, flag) {
          state.address.setInterestCode = flag;
       }
    },
   actions: {
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
      // async userConfirm({ commit},user) {
      //    await login(user, ({ data }) => {
      //        if (data.message === "success") {
      //          let accessToken = data["access-token"];
      //          let refreshToken = data["refresh-token"];
      //          // console.log("login success token created!!!! >> ", accessToken, refreshToken);
      //          commit("SET_IS_LOGIN", true);
      //          commit("SET_IS_VALID_TOKEN", true);
      //          sessionStorage.setItem("access-token", accessToken);
      //          sessionStorage.setItem("refresh-token", refreshToken);
      //        } else {
      //          commit("SET_IS_LOGIN", false);
      //          commit("SET_IS_VALID_TOKEN", false);
      //        }
      //      },
      //      (error) => {
      //        console.log(error);
      //      }
      //    );
      //  },
      //  async getUserInfo({ commit, dispatch }, token) {
      //    let decodeToken = jwtDecode(token);
      //    // console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      //    await findById(decodeToken.userEmail,({ data }) => {
      //        if (data.message === "success") {
      //          commit("SET_USER_INFO", data.userInfo);
      //          // console.log("3. getUserInfo data >> ", data);
      //        } else {
      //          console.log("유저 정보 없음!!!!");
      //        }
      //      },
      //      async (error) => {
      //        console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
      //        commit("SET_IS_VALID_TOKEN", false);
      //        await dispatch("tokenRegeneration");
      //      }
      //    );
      //  },
      //  async tokenRegeneration({ commit, state }) {
      //    console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      //    await tokenRegeneration(
      //      JSON.stringify(state.userInfo),
      //      ({ data }) => {
      //        if (data.message === "success") {
      //          let accessToken = data["access-token"];
      //          console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
      //          sessionStorage.setItem("access-token", accessToken);
      //          commit("SET_IS_VALID_TOKEN", true);
      //        }
      //      },
      //      async (error) => {
      //        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
      //        if (error.response.status === 401) {
      //          console.log("갱신 실패");
      //          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
      //          await logout(state.userInfo.userEmail,({ data }) => {
      //              if (data.message === "success") {
      //                console.log("리프레시 토큰 제거 성공");
      //              } else {
      //                console.log("리프레시 토큰 제거 실패");
      //              }
      //              alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
      //              commit("SET_IS_LOGIN", false);
      //              commit("SET_USER_INFO", null);
      //              commit("SET_IS_VALID_TOKEN", false);
      //              router.push({ name: "login" });
      //            },
      //            (error) => {
      //              console.log(error);
      //              commit("SET_IS_LOGIN", false);
      //              commit("SET_USER_INFO", null);
      //            }
      //          );
      //        }
      //      }
      //    );
      //  },
      //  async userLogout({ commit }, userEmail) {
      //    await logout(userEmail, ({ data }) => {
      //        if (data.message === "success") {
      //          commit("SET_IS_LOGIN", false);
      //          commit("SET_USER_INFO", null);
      //          commit("SET_IS_VALID_TOKEN", false);
      //        } else {
      //          console.log("유저 정보 없음!!!!");
      //        }
      //      },
      //      (error) => {
      //        console.log(error);
      //      }
      //    );
      //  },
       
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
         async eventList(context) {
            let params = {
               limit: this.state.notice.limit,
               offset: this.state.notice.offset,
               searchWord: this.state.notice.searchWord,
            };
   
            try {
               let { data } = await http.get("/events", { params }); // params: params shorthand property, let response 도 제거
               console.log(data);
               if (data.result == "login") {
                  router.push("/login");
               } else {
                  context.commit("SET_EVENT_LIST", data.list);
                  context.commit("SET_EVENT_TOTAL_LIST_ITEM_COUNT", data.count);
               }
            } catch (error) {
               console.error(error);
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

      getBoardList: function (state) {
         return state.board.list;
      },

      /////////////////////////
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
      //  getSidoList: function (state) {
      //     return state.address.sido;
      //    },
      getFilteredSigungu: function (state) {
          return state.address.sigungu.filter(item => item.code.substr(0,2) == state.address.sidoSelect);
         },
       getFilteredDong: function (state) {
         return state.address.dong.filter(item => item.code.substr(0,5) == state.address.sigunguSelect);
         }

    }

})