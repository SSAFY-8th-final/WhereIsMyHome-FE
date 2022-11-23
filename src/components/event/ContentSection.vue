<template>
    <section id="project-details" class="project-details">
        <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row justify-content-between gy-4 mt-4">
                    <div class="col-lg-8">
                        <div class="portfolio-description">
                            <event-img-slide></event-img-slide>
                            <div id="content">
                                <h2>{{ $store.state.event.name }}</h2>
                                <p v-html="$store.state.event.content"></p>
    
                                <testimonial-item></testimonial-item>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <side-summary></side-summary>
                    </div>
            </div>
        </div>
    </section>
</template>

<script>
import http from "@/common/axios.js";

import EventImgSlide from "@/components/event/EventImgSlide.vue";
import TestimonialItem from "@/components/event/TestimonialItem.vue";
import SideSummary from "@/components/event/SideSummary.vue";

export default {
    components: {
        EventImgSlide,
        TestimonialItem,
        SideSummary
    },
    methods: {
        async eventDetail() {
            this.$store.dispatch('getUserInfo');
            let params = {
                userSeq: this.$store.state.user.userInfo.userSeq,
                userEmail: this.$store.state.user.userInfo.userEmail,
            }
            try {
                let { data } = await http.get('/events/' + this.$route.params.id, {params});
                console.log(data);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    let { dto } = data;
                    this.$store.commit("SET_EVENT_DETAIL", dto);
                }
            } catch (error) {
                console.log("AdminEventVue: error : ");
                console.log(error);
            }
        },
    },
    created() {
        this.eventDetail();
    }
}
</script>

<style scoped>
#content {
    margin-top: 40px;
}
</style>