<template>
    <div>
        <user-profile></user-profile>
        <h4 class="mt-5 mb-2">내 관심지역</h4>
        <div class="alt-services">

            <div class="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="200">
              <i class="bi bi-compass flex-shrink-0"></i>
              <div class="mt-3">
                <h4><router-link to="/map">{{this.addressStr}}</router-link></h4>
              </div>
            </div><!-- End Icon Box -->
        </div>
    </div>
</template>

<script>
import UserProfile from "@/components/user/UserProfile.vue";
export default {
    data: function () {
        return{
            address : null,
            addressStr: '관심 지역이 설정되지 않았습니다'
        }
    },
    components: {
        UserProfile
    },
    created(){
        this.address = this.$store.getters.getAddressByDongCode(this.$store.state.user.userInfo.interestCode)
        if(this.address != null)
            this.addressStr = this.address.sido + " " + this.address.sigungu + " " + this.address.dong 
    }
}
</script>

<style scoped>
.alt-services >>> .icon-box {
    margin-top: 20px;
}
</style>