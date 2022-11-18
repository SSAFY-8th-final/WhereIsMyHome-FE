import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import NavBar from '@/components/NavBar.vue';
import MainPage from '@/views/AppMain';
import AppMap from '@/views/AppMap';
import AppFav from '@/views/AppFav';
import AppEvent from '@/views/AppEvent';
import AppNotice from '@/views/AppNotice';
import AppLogin from "@/views/AppLogin";
import AppRegister from "@/views/AppRegister";
import AppDetail from "@/views/AppDetail";
import AppMyPage from "@/views/AppMyPage";
import AppAdminNotice from "@/views/AppAdminNotice";
import FooterPage from '@/components/FooterPage.vue';

export default new VueRouter({
    routes: [
        {
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
            path: '/notice',
            components: {
                NavBar,
                default: AppNotice,
                FooterPage
            }
        },    
        {
            path: '/detail',
            components: {
                NavBar,
                default: AppDetail,
                FooterPage
            }
        },    
        {
            path: "/login",
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
            path: "/profile",
            components: {
                NavBar,
                default: AppMyPage,
                FooterPage,
            },
        },
        {
            path: "/admin/notice",
            components: {
                NavBar,
                default: AppAdminNotice,
                FooterPage,
            }
        }

    ]
});