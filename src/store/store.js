import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import jwtDecode from "jwt-decode";

import http from "@/common/axios.js";
import kakaoapi from "@/common/axioskakao.js";
import util from "@/common/util.js";

import router from "@/routers/routers.js";

import AddrSido from "@/assets/json/sido.json";
import AddrSigungu from "@/assets/json/sigungu.json";
import AddrDong from "@/assets/json/dong.json";

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
            token: "",
            refresh: "",

            userInfo: null,
            isValidToken: false,

            favList: [],
            totalListItemCount: 0,

            // Login
            userInput: {
                userEmail: "",
                userPassword: "",
            },
        },
        sale: {
            saleInfo: null,
            list: [],
            limit: 10,
            offset: 0,

            totalListItemCount: 0,

            no: 0,
            dongCode: "",
            postDate: "",
            moveInDate: "",
            saleAmount: "",
            addressDetail: "",
            moveInDateStr: "",

            description: "",
            room: "",
            bathroom: "",
            floor: "",

            moveInCode: "",
            saleTypeCode: "",

            utilityBill: "",
            parking: "",
            direction: "",

            dong: "",
            AptName: "",

            buildYear: "",
            jibun: "",

            lat: "",
            lng: "",
        },
        map: {
            list: [], // houseDto
            gugunCode: "",
            dongCode: "",
            searchWord: "",

            totalListItemCount: 0,
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
            formatedStart: "",
            endDateTime: "",
            formatedEnd: "",
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
            sidoSelect: "11",
            sigunguSelect: null,
            dongSelect: null,

            sidoList: AddrSido,
            sigunguList: AddrSigungu,
            dongList: AddrDong,
        },
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
        SET_TOKEN(state, payload) {
            state.user.token = payload.accessToken;
            state.user.refresh = payload.refreshToken;
        },
        SET_ACCESS_TOKEN(state, token) {
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
            state.event.formatedStart = payload.formatedStart;
            state.event.formatedEnd = payload.formatedEnd;
            state.event.endDateTime = payload.endDateTime;
            state.event.statusCode = payload.statusCode;
            state.event.registerId = payload.registerId;
            state.event.registerDate = util.makeDateStr(
                payload.registerDateTime.date.year,
                payload.registerDateTime.date.month,
                payload.registerDateTime.date.day,
                "/"
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
        SET_EVENT_FORMATEDSTART(state, format) {
            state.event.formatedStart = format;
        },
        SET_EVENT_STARTDATETIME(state, date) {
            state.event.startDateTime = date;
        },
        SET_EVENT_FORMATEDEND(state, format) {
            state.event.formatedEnd = format;
        },
        SET_EVENT_ENDDATETIME(state, format) {
            state.event.endDateTime = format;
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
        /* dealer sale */
        SET_SALE_LIST(state, list) {
            state.sale.list = list;
        },
        SET_SALE_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.sale.totalListItemCount = count;
        },
        SET_SALE_MOVE_PAGE(state, pageIndex) {
            state.sale.offset = (pageIndex - 1) * state.pagination.listRowCount;
            state.pagination.currentPageIndex = pageIndex;
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
            state.address.setInterestCode = true;
            state.address.sidoSelect = dongCode.substring(0, 2);
            state.address.sigunguSelect = dongCode.substring(0, 5);
            state.address.dongSelect = dongCode;
        },
        /* map */
        SET_MAP_LIST(state, list) {
            state.map.list = list;
        },
        SET_MAP_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.map.totalListItemCount = count;
        },
        /* sale */
        SET_SALE_DETAIL(state, payload) {
            state.sale.no = payload.no;
            state.sale.dongCode = payload.dongCode;
            state.sale.postDate = payload.postDate;
            state.sale.moveInDate = payload.moveInDate;
            state.sale.saleAmount = payload.saleAmount;
            state.sale.addressDetail = payload.addressDetail;
            state.sale.moveInDateStr = payload.moveInDateStr;

            state.sale.description = payload.description;
            state.sale.room = payload.room;
            state.sale.bathroom = payload.bathroom;
            state.sale.floor = payload.floor;

            state.sale.moveInCode = payload.moveInCode;
            state.sale.saleTypeCode = payload.saleTypeCode;

            state.sale.utilityBill = payload.utilityBill;
            state.sale.parking = payload.parking;
            state.sale.direction = payload.direction;

            state.sale.dong = payload.dong;
            state.sale.AptName = payload.AptName;

            state.sale.buildYear = payload.buildYear;
            state.sale.jibun = payload.jibun;

            state.sale.lat = payload.lat;
            state.sale.lng = payload.lng;
        },
        /* fav */
        SET_FAV_LIST(state, payload) {
            state.user.favList = payload;
        },
        SET_FAV_TOTAL_LIST_ITEM_COUNT(state, count) {
            state.user.totalListItemCount = count;
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
        async saleList(context, payload) {
            let params = {
                searchWord: '',
                dongCode: '',
                houseinfoNo: ''
            };
            console.log('payload' + payload)
            try {
              if(payload != null && payload != ''){
                params.dongCode = payload.dongCode
                params.houseinfoNo = payload.houseinfoNo
              }
              let { data } = await http.get("/maps/houses", { params });
                console.log(data);
                
                context.commit("SET_MAP_LIST", data.list);
                context.commit("SET_MAP_TOTAL_LIST_ITEM_COUNT", data.count);
                
            } catch (error) {
                console.error(error);
            }
        },
        async dealerSaleList(context) {
            try {
                let params = {
                    limit: this.state.sale.limit,
                    offset: this.state.sale.offset,
                    userEmail: this.state.user.userInfo.userEmail
                    //option: selectStatus,
                };
                console.log('dealerSaleList')
                console.log(params)
              let { data } = await http.get("/sales/dealer", {params});
                console.log(data);
                
                context.commit("SET_SALE_LIST", data.list);
                context.commit("SET_SALE_TOTAL_LIST_ITEM_COUNT", data.count);
                
            } catch (error) {
                console.error(error);
            }
        },
        async login(context, payload) {
            try {
                let response = await http.post("/login", JSON.stringify(payload));
                let { data } = response;
                console.log(response.status);

                let statusCode = response.status;
                if (statusCode == 200) {
                    context.commit("SET_IS_LOGIN", true);
                    context.commit("SET_IS_VALID_TOKEN", true);
                    context.commit("SET_TOKEN", {
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                    });
                    sessionStorage.setItem("access-token", data.accessToken);
                    sessionStorage.setItem("refresh-token", data.refreshToken);
                } else if (statusCode == 401) {
                    context.commit("SET_IS_LOGIN", false);
                    context.commit("SET_IS_VALID_TOKEN", false);
                    alert("아이디 또는 비밀번호 잘못 입력");
                } else {
                    alert("사이트 오류");
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getUserInfo(context, token) {
            let decodeToken = jwtDecode(token);
            console.log("2. getUserInfo() decodeToken :: ", decodeToken);
            console.log(token);
            try {
                let response = await http.get("/users/" + decodeToken.userEmail);
                let { data } = response;

                let statusCode = response.status;
                if (statusCode == 200) {
                    context.commit("SET_USER_INFO", data.UserDto);
                    context.commit("SET_IS_VALID_TOKEN", true);
                    let interestCode = data.UserDto.interestCode;

                    if (interestCode != null && interestCode != "")
                        context.commit("SET_INTEREST_CODE", data.UserDto.interestCode);
                }
            } catch (error) {
                context.commit("SET_USER_INFO", null);
                context.commit("SET_IS_VALID_TOKEN", false);
                alert("다시 로그인 해주세요");
                await this.dispatch("tokenRegeneration");
            }
        },
        async logout(context) {
            console.log("2. logout()  :: ");
            let decodeToken = jwtDecode(this.getters.getAccessToken);
            let response = await http.get("/logout/" + decodeToken.userEmail);

            let statusCode = response.status;
            if (statusCode == 200) {
                context.commit("SET_IS_LOGIN", false);
                context.commit("SET_USER_INFO", null);
                context.commit("SET_IS_VALID_TOKEN", false);
                context.commit("SET_TOKEN", { accessToken: null, refreshToken: null });
            } else {
                console.log("유저 정보 없음!!!!");
            }
        },

        async tokenRegeneration(context) {
            console.log("tokenRegeneration");
            try {
                let response = await http.post(
                    "/users/refresh",
                    JSON.stringify(this.state.user.userInfo)
                );
                let { data } = response;
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
                await this.dispatch("logout");
            }
        },

        async checkPassword(context, password) {
            console.log("checkPassword :: " + password);
            let params = {
                userPassword: password,
                userEmail: this.state.user.userInfo.userEmail,
            };
            try {
                let response = await http.post("/checkPw", params);
                let statusCode = response.status;
                console.log(statusCode);
                if (statusCode == 200) {
                    return true;
                } else if (statusCode == 401) {
                    console.log("잘못된 비밀번호 입력");
                    return false;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async register(context, user) {
            if (this.state.address.setInterestCode)
                user.interestCode = this.state.address.dongSelect;
            try {
                await http.post("/register", JSON.stringify(user));
                context.commit("SET_USER_INFO", user);
            } catch (error) {
                alert("회원가입 실패");
            }
        },
        async userUpdate(context, payload) {
            let params = payload.user;
            if (payload.setInterestCode) params.interestCode = this.state.address.dongSelect;
            try {
                let response = await http.patch(
                    "/users/" + this.state.user.userInfo.userEmail,
                    params
                );
                let statusCode = response.status;
                console.log(statusCode);
                if (statusCode == 200) {
                    alert("정보 수정 성공");
                }
            } catch (error) {
                console.log(error);
                if (error.status == 401) alert("다시 로그인해주세요");
                else alert("문제 발생");
            }
        },
        async saleInsert(context, payload) {
            let insertParams = payload.item;

            console.log(payload.files);

            // 추후 수정
            // let decodeToken = jwtDecode(this.getters.getAccessToken);
            // let decodeToken = jwtDecode(token);
            // console.log("2. getUserInfo() decodeToken :: ", decodeToken.userEmail);

            try {
                let { data } = await kakaoapi.get(
                    "/v2/local/search/address" + "?query=" + payload.addr
                );
                console.log(data);
                console.log(data.documents[0]);

                let result = data.documents[0];
                let jibun = result.address.main_address_no +'-'+ result.address.sub_address_no;
                let AptName = result.road_address.building_name;

                console.log(result.address.region_3depth_name);
                console.log(jibun);
                const searchParams = {
                    jibun: jibun,
                    dong: result.address.region_3depth_name,
                };

                let houseinfoNo = await this.dispatch("getHouseInfo", searchParams);

                if (houseinfoNo == -1) {
                    if (AptName != "") {
                        const houseInsertParam = {
                            AptName: AptName,
                            dong: result.address.region_3depth_name,
                            code: result.address.b_code.substr(0, 5),
                            jibun: jibun,
                            lat: result.address.y,
                            lng: result.address.x,
                        };
                        houseinfoNo = await this.dispatch("houseInsert", houseInsertParam);
                        console.log("new House " + houseinfoNo);
                        insertParams.houseinfoNo = houseinfoNo;
                        (insertParams.dongCode = result.address.b_code),
                            await this.dispatch("saleInsertOne", insertParams);
                    }
                } else {
                    insertParams.houseinfoNo = houseinfoNo;
                    (insertParams.dongCode = result.address.b_code),
                        console.log("집 잇음 " + houseinfoNo);
                    console.log(insertParams);
                    await this.dispatch("saleInsertOne", insertParams);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getHouseInfo(context, payload) {
            console.log("getHouseInfo");
            let no = -1;
            try {
                let { data } = await http.post("/house/search-address", JSON.stringify(payload));
                console.log(data);
                no = data;
            } catch (error) {
                console.log(error);
            }
            return no;
        },
        async houseInsert(context, payload) {
            let no = -1;
            try {
                console.log("houseInsert");
                let { data } = await http.post("/house", JSON.stringify(payload));
                no = data.no;
            } catch (error) {
                console.log(error);
            }
            return no;
        },
        async saleInsertOne(context, payload) {
            try {
                let { data } = await http.post("/sales/dealer", payload);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },
        async dongInfo() {
            let dongCode = this.getters.checkUserInfo.interestCode;
            if (dongCode == null) {
                // do somthing
                console.log("dongCode not exist");
            }
            let addr = this.getters.getAddressByDongCode(dongCode);
            let query = addr.sido + " " + addr.dong;
            let category = ["CS2", "BK9", "PO3", "MT1", "SC4", "PK6"];
            console.log(query);

            const resArray = [];
            try {
                for await (const param of category) {
                    let searchParams = "?query=" + query + "&category_group_code=" + param;
                    let { data } = await kakaoapi.get("/v2/local/search/keyword" + searchParams);
                    resArray.push(data.meta.total_count);
                }
                console.log(resArray);
                return {list: resArray, dong: addr.dong};
            } catch (error) {
                console.log(error);
            }
        },
        async houseSearchByName(context, searchWord) {
            try {
                let { data } = await http.get("/maps/search/" +  searchWord ); // params: params shorthand property, let response 도 제거
                console.log(data);
                return data
            } catch (error) {
                console.error(error);
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
        getAccessToken: function (state) {
            return state.user.token;
        },
        getEventList: function (state) {
            return state.event.list;
        },
        getNoticeList: function (state) {
            return state.notice.list;
        },
        getSaleList: function (state) {
            return state.sale.list;
        },
        getSaleInfo: function (state) {
            return state.sale.saleInfo;
        },

        // pagination
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
        getPrev: function (state) {
            if (state.pagination.currentPageIndex <= state.pagination.pageLinkCount) {
                return false;
            } else {
                return true;
            }
        },
        // eventPagination
        getEventPageCount: function (state) {
            return Math.ceil(state.event.totalListItemCount / state.pagination.listRowCount);
        },
        getEventEndPageIndex: function (state, getters) {
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
            return ret > getters.getEventPageCount ? getters.getEventPageCount : ret;
        },
        getEventNext: function (state, getters) {
            if (
                Math.floor(getters.getEventPageCount / state.pagination.pageLinkCount) *
                    state.pagination.pageLinkCount <
                state.pagination.currentPageIndex
            ) {
                return false;
            } else {
                return true;
            }
        },
        // noticePagination
        getNoticePageCount: function (state) {
            return Math.ceil(state.notice.totalListItemCount / state.pagination.listRowCount);
        },
        getNoticeEndPageIndex: function (state, getters) {
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
            return ret > getters.getNoticePageCount ? getters.getNoticePageCount : ret;
        },
        getNoticeNext: function (state, getters) {
            if (
                Math.floor(getters.getNoticePageCount / state.pagination.pageLinkCount) *
                    state.pagination.pageLinkCount <
                state.pagination.currentPageIndex
            ) {
                return false;
            } else {
                return true;
            }
        },
        // salePagination
        getSalePageCount: function (state) {
            return Math.ceil(state.sale.totalListItemCount / state.pagination.listRowCount);
        },
        getSaleEndPageIndex: function (state, getters) {
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
            return ret > getters.getSalePageCount ? getters.getSalePageCount : ret;
        },
        getSaleNext: function (state, getters) {
            if (
                Math.floor(getters.getSalePageCount / state.pagination.pageLinkCount) *
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
            return state.address.sidoList.filter((item) => item.code == code.substr(0, 2)).name;
        },
        getSigunguNameByCode: (state) => (code) => {
            return state.address.sigunguList.filter((item) => item.code == code.substr(0, 5)).name;
        },
        getDongNameByCode: (state) => (code) => {
            return state.address.dongList.filter((item) => item.code == code).name;
        },

        getAddressByDongCode: (state) => (dongCode) => {
            let address = {
                sido: "",
                sigungu: "",
                dong: "",
            };
            address.sido = state.address.sidoList.find((e) => e.code == dongCode.substr(0, 2)).name;
            address.sigungu = state.address.sigunguList.find(
                (e) => e.code == dongCode.substr(0, 5)
            ).name;
            address.dong = state.address.dongList.find((e) => e.code == dongCode).name;

            return address;
        },
        getDongNameBySearchWord: (state) => (searchWord) => {
            let listDong = state.address.dongList.filter((item) => (item.name).includes(searchWord));
            let listSigungu = state.address.sigunguList.filter((item) => (item.name).includes(searchWord));
            
            let listTrans = []
            listSigungu.forEach(item => {
                let tmpList = state.address.dongList.filter((d) => (d.code).substr(0,5) == item.code);
                listTrans.push(...tmpList)
            });
            listDong.push(...listTrans)
            // const arr = listDong.concat(listSigungu)
            // list.array.forEach(element => {
                
            // });
            return listDong
        }
    },
});
