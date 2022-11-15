import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import NavBar from '@/components/NavBar.vue';
import MainPage from '@/views/AppMain';
import MapMain from '@/views/AppMap';
import AppFav from '@/views/AppFav';
import AppEvent from '@/views/AppEvent';
import AppNotice from '@/views/AppNotice';
import AppLogin from "@/views/AppLogin";
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
                default: MapMain,
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
            path: "/login",
            components: {
                NavBar,
                default: AppLogin,
                FooterPage,
            },
        },

    ]
});