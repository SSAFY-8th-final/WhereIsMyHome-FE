import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import jwtDecode from "jwt-decode";

import http from "@/common/axios.js";
import kakaoapi from "@/common/axioskakao";
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
      token: '',
      refresh: '',

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

      sidoList: AddrSido,
      sigunguList: AddrSigungu,
      dongList: AddrDong,
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
      SET_TOKEN(state, payload){
        state.user.token = payload.accessToken;
        state.user.refresh = payload.refreshToken;
      },
      SET_ACCESS_TOKEN(state, token){
        state.user.token = token;
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
      SET_USE_INTEREST_CODE(state, flag) {
        state.address.setInterestCode = flag;
    },
      SET_INTEREST_CODE(state, dongCode) {
        state.address.setInterestCode = true
        state.address.sidoSelect = dongCode.substring(0, 2);
        state.address.sigunguSelect = dongCode.substring(0, 5);
        state.address.dongSelect = dongCode;
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
           
           let response = await http.post('/login', JSON.stringify(payload))
           let { data } = response
           console.log(response.status);

           let statusCode = response.status;
           if (statusCode == 200) {
              context.commit("SET_IS_LOGIN", true);
              context.commit("SET_IS_VALID_TOKEN", true);
              context.commit("SET_TOKEN", {"accessToken": data.accessToken, "refreshToken": data.refreshToken});
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
      
     async getUserInfo(context, token){
        let decodeToken = jwtDecode(token);
        console.log("2. getUserInfo() decodeToken :: ", decodeToken);
       console.log(token)
       try {
         let response = await http.get('/users/'+ decodeToken.userEmail);
        let {data} = response;

        let statusCode = response.status;
        if(statusCode == 200){
          context.commit("SET_USER_INFO", data.UserDto);
          context.commit("SET_IS_VALID_TOKEN", true);
          let interestCode = data.UserDto.interestCode;
          
          if(interestCode != null && interestCode != '')
          context.commit("SET_INTEREST_CODE", data.UserDto.interestCode)
        } else if(statusCode == 401){
          context.commit("SET_USER_INFO", null);
          context.commit("SET_IS_VALID_TOKEN", false);
          alert('다시 로그인 해주세요')
        } else {
          context.commit("SET_USER_INFO", null);
          context.commit("SET_IS_VALID_TOKEN", false);
          alert('서버 오류')
          await this.$store.dispatch("tokenRegeneration");
        }
       } catch (error){
        if(error.status == 401){
          context.commit("SET_USER_INFO", null);
          context.commit("SET_IS_VALID_TOKEN", false);
          alert('다시 로그인 해주세요')
        } else {
          context.commit("SET_USER_INFO", null);
          context.commit("SET_IS_VALID_TOKEN", false);
          alert('다시 로그인 해주세요')
          await this.dispatch("tokenRegeneration");
        }
       }
        
     },
     async logout(context) {
        console.log("2. logout()  :: ");
        let decodeToken = jwtDecode(this.getters.getAccessToken);
          let response = await http.get('/logout/'+decodeToken.userEmail);

          let statusCode = response.status;
          if(statusCode == 200){
            context.commit("SET_IS_LOGIN", false);
            context.commit("SET_USER_INFO", null);
            context.commit("SET_IS_VALID_TOKEN", false);
            context.commit("SET_TOKEN", {"accessToken": null, "refreshToken": null});
          } else {
            console.log("유저 정보 없음!!!!");
          }

        },
    
      async tokenRegeneration(context) {
        console.log("tokenRegeneration")
        try {
          
          let response = await http.post('/users/refresh', JSON.stringify(this.state.user.userInfo))
          let { data } = response
          console.log(response.status);

          let statusCode = response.status;
          if (statusCode == 200) {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("Authrozation", accessToken);
            context.commit("SET_IS_VALID_TOKEN", true);
             context.commit("SET_IS_LOGIN", true);
             context.commit("SET_IS_VALID_TOKEN", true);
             context.commit("SET_ACCESS_TOKEN", accessToken);
          } 

       } catch (error) {
          console.log(error);
          await this.dispatch('logout');
       }
     },

      async checkPassword(context, password) { 
        console.log("checkPassword :: " + password);
        let params = {
          userPassword: password,
          userEmail: this.state.user.userInfo.userEmail
        };
        try {
          let response = await http.post('/checkPw', params);
          let statusCode = response.status;
          console.log(statusCode)
          if(statusCode == 200){
            return true;
          } else if(statusCode == 401) {
            console.log("잘못된 비밀번호 입력");
            return false;
          }
          
        } catch (error) {
          console.log(error);
            return false;
        }

      },

      async saleInsert(context, payload){

        let insertParams = payload.item
        
        console.log(payload.files)

        // 추후 수정
        // let decodeToken = jwtDecode(this.getters.getAccessToken);
        // let decodeToken = jwtDecode(token);
        // console.log("2. getUserInfo() decodeToken :: ", decodeToken.userEmail);

        try{
          let {data} = await kakaoapi.get('/v2/local/search/address'+'?query='+payload.addr)
          console.log(data)
          console.log(data.documents[0])
          
          let result = data.documents[0]
          let jibun = result.address.main_address_no + result.address.sub_address_no
          let AptName = result.road_address.building_name;
          
          console.log(result.address.region_3depth_name)
          console.log(jibun)
          const searchParams = {
            jibun : jibun,
            dong : result.address.region_3depth_name
          }
          
          let houseinfoNo = await this.dispatch("getHouseInfo", searchParams);

          if(houseinfoNo == -1 ){
            if(AptName != ''){
              const houseInsertParam = {
                AptName: AptName,
                dong: result.address.region_3depth_name,
                code: (result.address.b_code).substr(0, 5),
                jibun: jibun,
                lat: result.address.y,
                lng: result.address.x,
              }
              houseinfoNo = await this.dispatch("houseInsert", houseInsertParam);
              console.log('new House '+houseinfoNo)
              insertParams.houseinfoNo = houseinfoNo
              insertParams.dongCode = result.address.b_code,
              await this.dispatch("saleInsertOne", insertParams)
            }
          }else{
            insertParams.houseinfoNo = houseinfoNo;
            insertParams.dongCode = result.address.b_code,
            console.log('집 잇음 ' + houseinfoNo)
            console.log(insertParams)
            await this.dispatch("saleInsertOne", insertParams)
          }
        }catch(error){
          console.log(error)
        }
      },
      async getHouseInfo(context, payload){
        console.log('getHouseInfo')
        let no = -1
        try{
          let {data} = await http.post('/house/search-address', JSON.stringify(payload))
          console.log(data)
          no = data
        }catch(error){
          console.log(error)
        }
        return no
      }, 
      async houseInsert(context, payload){
        let no = -1
        try{
          console.log('houseInsert')
          let {data} = await http.post('/house', JSON.stringify(payload))
          no = data.no
        }catch(error){
          console.log(error)
        }
        return no
      },
      async saleInsertOne(context, payload){
        try{
          let {data} = await http.post('/sales/dealer', payload)
          console.log(data)
        }catch(error){
          console.log(error)
        }
      }

    },
    getters: {
      isLogin: function (state) {
        return state.user.isLogin;
      },
     checkUserInfo: function (state) {
        return state.user.userInfo;
      },
      checkToken: function (state) {
        return state.user.isValidToken;
      },
      getAccessToken: function(state){
        return state.user.token;
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
        return state.address.sigunguList.filter(
          (item) => item.code.substr(0, 2) == state.address.sidoSelect
        );
      },
      getFilteredDong: function (state) {
        return state.address.dongList.filter(
          (item) => item.code.substr(0, 5) == state.address.sigunguSelect
        );
      },
      getSidoNameByCode: (state) => (code) => {
        return state.address.sidoList.filter(
          (item) => item.code == code.substr(0, 2)
        ).name;
      },
      getSigunguNameByCode: (state) => (code) => {
        return state.address.sigunguList.filter(
          (item) => item.code == code.substr(0, 5)
        ).name;
      },
      getDongNameByCode: (state) => (code) =>{
        return state.address.dongList.filter(
          (item) => item.code == code
        ).name;
      },
      
      getAddressByDongCode: (state) => (dongCode) => {
        let address = {
          sido: '',
          sigungu: '',
          dong: ''
        };
        address.sido = (state.address.sidoList.find(e => e.code == dongCode.substr(0, 2))).name
        address.sigungu = (state.address.sigunguList.find(e => e.code == dongCode.substr(0, 5))).name
        address.dong =(state.address.dongList.find(e => e.code == dongCode)).name
        
        return address;
      }
    },
    })