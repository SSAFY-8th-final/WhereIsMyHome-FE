<template>
    <div class="portfolio-info">
        <h3>Event Information</h3>
        <ul>
        <li><strong>Category</strong> <span>{{ this.$store.state.event.category }}</span></li>
        <li><strong>장소</strong> <span>온라인</span></li>
        
        <li><strong>신청 시작일</strong> <span>{{ this.$store.state.event.startDateTime }}</span></li>
        <li><strong>신청 마감일</strong> <span>{{ this.$store.state.event.endDateTime }}</span></li>
        <li><strong>현재 {{ this.$store.state.event.attendCount }}명이 신청했어요!</strong></li>
        <li><a @click="toggleAttend" class="btn-visit align-self-start"
            :class="{ attended : this.$store.state.event.isAttend }">
            {{ statusText }}</a></li> <!-- 진행 상태에 따라 버튼 색상, 텍스트 다르게 -->
        </ul>
    </div>
</template>

<script>
import http from "@/common/axios.js";

export default {
    computed: {
        statusText() {
            if (this.$store.state.event.isAttend)
                return "신청완료";
            else
                return "참여하기";
        }
    },
    methods: {
        toggleAttend() {
            if (this.$store.state.event.isAttend)
                this.leaveEvent();
            else
                this.attendEvent();
        },
        async attendEvent() {
            try {
                this.$store.dispatch('getUserInfo');
                let params = {
                    userEmail: this.$store.state.user.userInfo.userEmail,
                }
                let { data } = await http.post('/events/' + this.$route.params.id, params);
                console.log(data);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    this.$alertify.success('이벤트 신청이 완료되었습니다.');
                    this.$store.commit("SET_EVENT_ISATTEND", true);
                    this.$store.commit("SET_EVENT_ATTENDCOUNT", 1);
                }
            } catch (error) {
                console.log("AdminEventVue: error : ");
                console.log(error);
            }
        },
        async leaveEvent() {
            try {
                let { data } = await http.delete('/events/' + this.$route.params.id);
                console.log(data);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    this.$alertify.success('이벤트 참여가 취소되었습니다.');
                    this.$store.commit("SET_EVENT_ISATTEND", false);
                    this.$store.commit("SET_EVENT_ATTENDCOUNT", -1);
                }
            } catch (error) {
                console.log("AdminEventVue: error : ");
                console.log(error);
            }
        },
    }
}
</script>

<style scoped>
.portfolio-info .btn-visit.align-self-start.attended {
    background-color: var(--color-secondary);

}
</style>