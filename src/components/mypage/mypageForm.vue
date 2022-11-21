<template>
      <section class="container-sm pd-4">
    <div class="bg-white border mx-auto" style="width: 100%;">
        <section class="w-100 p-4 d-flex justify-content-center pb-4">
        <div style="width: 26rem;">
            <div class="container">

                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" class="form-control" :value="$store.state.user.userInfo.userEmail" readonly disabled/>
                    <label class="form-label" for="registerEmail">Email</label>
                </div>

                <!-- Username input -->
                <div class="form-outline mb-4">
                    <input type="text" v-model="userName" class="form-control" disabled/>
                    <label class="form-label" for="registerUsername">Username</label>
                </div>

                <!-- Checkbox -->
                <div class="form-check">
                    <input class="form-check-input me-2" type="checkbox" v-model="setInterestCode"/>
                    <label class="form-check-label" for="interestCheck" >
                        관심지역 
                    </label>
                    
                </div>
                <div v-show="setInterestCode" >
                    <interest-select-box></interest-select-box>
                </div>

                <!-- Submit button -->
                <button class="btn btn-primary btn-block mb-3">정보 수정</button>

            </div>
        </div>
        </section>
    </div>
    </section>
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