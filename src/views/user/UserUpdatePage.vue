<template>
<div>
        <h4 class="mt-2 mb-2">회원정보 수정</h4>

      <section class="container-sm pd-4">
        <section class="w-100 p-4 d-flex justify-content-center pb-4">
        <div style="width: 26rem;">
            <div class="container">

                <!-- Username input -->
                <div class="form-outline mb-4">
                    <input type="text" v-model="userName" class="form-control"/>
                    <label class="form-label" for="registerUsername">Username</label>
                </div>
                                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" id="registerPassword" class="form-control" />
                    <label class="form-label" for="registerPassword">Password</label>
                </div>

                <!-- Repeat Password input -->
                <div class="form-outline mb-4">
                    <input type="password" id="registerRepeatPassword" class="form-control" />
                    <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                </div>

                <!-- Checkbox -->
                <div class="form-check">
                    <input class="form-check-input me-2" type="checkbox" v-model="setInterestCode"/>
                    <label class="form-check-label" for="interestCheck" >
                        관심지역 설정
                    </label>
                    
                </div>
                <div v-show="setInterestCode" >
                    <interest-select-box></interest-select-box>
                </div>

                <!-- Submit button -->
                <button class="btn btn-primary btn-block my-3">정보 수정</button>

            </div>

        </div>
        </section>
    </section>
</div>
</template>

<script>
import InterestSelectBox from "@/components/login/InterestSelectBox.vue";

export default {
    data: function () {
        return{
            setInterestCode: false,
            userName: this.$store.state.user.userInfo.userName,
            
            interestCode: '',

        }
    },
    components: {
        InterestSelectBox
    },
    created(){
        this.setInterestCode = this.$store.state.address.setInterestCode;
    }
}
</script>

<style>

</style>