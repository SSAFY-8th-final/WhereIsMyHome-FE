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
                    <label class="form-label">Username</label>
                </div>
                                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" v-model="password1" class="form-control" />
                    <label class="form-label">Password</label>
                </div>

                <!-- Repeat Password input -->
                <div class="form-outline mb-4">
                    <input type="password" class="form-control" />
                    <label class="form-label">Repeat password</label>
                </div>

                <!-- Checkbox -->
                <div class="form-check">
                    <input class="form-check-input me-2" type="checkbox" v-model="setInterestCode"/>
                    <label class="form-check-label">
                        관심지역 설정
                    </label>
                    
                </div>
                <div v-show="setInterestCode" >
                    <interest-select-box></interest-select-box>
                </div>

                <!-- Submit button -->
                <button @click="userUpdateHandle" class="btn btn-primary btn-block my-3">정보 수정</button>

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
            setInterestCode: false, // 체크박스 handle
            userName: '',
            password1: '',
            password2: '',
        }
    },
    components: {
        InterestSelectBox
    },
    methods: {
    async userUpdateHandle() {
        const user = {
            userName: this.userName,
            userPassword: this.password1
        }
       
      await this.$store.dispatch("userUpdate",{user: user, setInterestCode: this.setInterestCode} );
      
    },
  },
    created(){
        this.setInterestCode = this.$store.state.address.setInterestCode;
        this.userName = this.$store.state.user.userInfo.userName;
    }
}
</script>

<style>

</style>