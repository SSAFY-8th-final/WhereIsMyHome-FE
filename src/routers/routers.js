import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import NavBar from "@/components/NavBar.vue";
import MainPage from "@/views/AppMain";
import AppMap from "@/views/AppMap";
import AppFav from "@/views/AppFav";
import AppEvent from "@/views/AppEvent";
import AppNotice from "@/views/AppNotice";
import AppLogin from "@/views/AppLogin";
import AppRegister from "@/views/AppRegister";
import AppDetail from "@/views/AppDetail";
import AppEventDetail from "@/views/AppEventDetail";
import AppMyPage from "@/views/AppMyPage";
import AppAdminNotice from "@/views/AppAdminNotice";
import AppAdminEvent from "@/views/AppAdminEvent";
import AppAdminUser from "@/views/AppAdminUser";
import UserEventList from "@/views/user/UserEventList.vue";
import UserMain from "@/views/user/UserMain.vue";
import UserUpdatePage from "@/views/user/UserUpdatePage.vue";
import FooterPage from "@/components/FooterPage.vue";


// test

import AppSaleInsert from "@/views/AppSaleInsert.vue";
import AppSaleList from "@/views/AppSaleList.vue";

import store from "@/store/store";

const onlyAuthUser = async (to, from, next) => {
    const checkUserInfo = store.getters.checkUserInfo;
    const checkToken = store.getters.checkToken;
    let token = store.state.user.token;
    console.log("로그인 처리 전", checkUserInfo, token);
    console.log(checkUserInfo)

    if (checkUserInfo != null && token) {
      console.log("토큰 유효성 체크하러 가자!!!!");
      await store.dispatch("getUserInfo", token);
    }
    if (!checkToken || checkUserInfo === null) {
        console.log(checkUserInfo)
        console.log(checkToken)
      alert("로그인이 필요한 페이지입니다.");
      // next({ name: "login" });
      router.push({ name: "login" });
    }
    else {
        console.log("로그인 했다!!!!!!!!!!!!!.");
        return next();
    }
    // console.log(next)
};
  

const  routes = [
        {
            name: "main",
            path: '/',
            components: {
                NavBar,
                default: MainPage,
                FooterPage
            }
        },
        {
            path: '/map',
            components: {
                NavBar,
                default: AppMap,
            }
        },
        {
            path: '/fav',
            components: {
                NavBar,
                default: AppFav,
                FooterPage
            }
        },
        {
            path: '/event',
            components: {
                NavBar,
                default: AppEvent,
                FooterPage
            }
        },
        {
            path: "/event/:id",
            components: {
            NavBar,
            default: AppEventDetail,
            FooterPage,
            },
        },
        {
            path: '/notice',
            components: {
                NavBar,
                default: AppNotice,
                FooterPage
            }
        },    
        {
            path: '/detail/:id',
            components: {
                NavBar,
                default: AppDetail,
                FooterPage
            }
        },    
        {
            name: "login",    
            path: "/login",
            beforeEnter: async (to, from, next) => { 
                if (store.getters.isLogin) {
                    router.push({ name: "main" });
                } else next();
            },
            components: {
                NavBar,
                default: AppLogin,
                FooterPage,
            },
        },
        {
            path: "/register",
            components: {
                NavBar,
                default: AppRegister,
                FooterPage,
            },
        },
        {
            path: "/user",
            name: "user",
            beforeEnter: onlyAuthUser,
            components: {
                NavBar,
                default: AppMyPage,
                FooterPage
            },
            children: [
              {
                path: "/user",
                name: "userMain",
                component: UserMain,
              },
              {
                path: "/user/userEvent",
                component: UserEventList,
              },
              {
                path: "/user/userUpdate",
                component: UserUpdatePage,
              },
          ]
          },
        {
            path: "/admin/notice",
            beforeEnter: onlyAuthUser,
            components: {
                NavBar,
                default: AppAdminNotice,
                FooterPage,
            }
        },
        {
            path: "/admin/event",
            beforeEnter: onlyAuthUser,
            components: {
            NavBar,
            default: AppAdminEvent,
            FooterPage,
            },
        },
        {
            path: "/admin/user",
            beforeEnter: onlyAuthUser,
            components: {
            NavBar,
            default: AppAdminUser,
            FooterPage,
            },
        },
        {
            path: "/sale/insert",
            beforeEnter: onlyAuthUser,
            components: {
                NavBar,
                default: AppSaleInsert,
                FooterPage,
            }
        },
        {
            path: "/sale",
            beforeEnter: onlyAuthUser,
            components: {
                NavBar,
                default: AppSaleList,
                FooterPage,
            }
        },

        

]
const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes,
});
export default router; 
