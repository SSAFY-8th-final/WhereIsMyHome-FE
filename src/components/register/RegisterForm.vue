<template>
    <div id="formItem">

        <!-- Pills content -->
        <div>
            <div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" v-model="userEmail" class="form-control" />
                    <label class="form-label" for="registerEmail">Email</label>
                </div>

                <!-- Username input -->
                <div class="form-outline mb-4">
                    <input type="text" v-model="userName" class="form-control" />
                    <label class="form-label" for="registerUsername">Username</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" v-model="password1" class="form-control" />
                    <label class="form-label" for="registerPassword">Password</label>
                </div>

                <!-- Repeat Password input -->
                <div class="form-outline mb-4">
                    <input type="password" v-model="password2" class="form-control" />
                    <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                </div>
                
                <div class="mb-2 radio-wrapper">
                    <input type="radio" id="one" value="002" v-model="gradeCode">
                    <label for="one">일반 회원</label>
                    <input type="radio" id="two" value="001" v-model="gradeCode">
                    <label for="two">공인중개사 회원</label>
                    <br>
                </div>

                <!-- Checkbox -->
                <div class="form-check mb-2" >
                    <input class="form-check-input me-2" type="checkbox" value="" id="interestCheck" v-model="setInterestCode"/>
                    <label class="form-check-label" for="interestCheck">
                        관심지역 설정
                    </label>
                    
                </div>
                <div v-show="setInterestCode" class="mb-2">
                    <interest-select-box></interest-select-box>
                </div>

                <!-- Submit button -->
                <button @click="handleRegister" class="btn btn-primary btn-block mb-3">Sign Up</button>

                <p class="text-center">or:</p>

                <div class="text-center mb-3">
                    <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-twitter"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                    <i class="fab fa-github"></i>
                    </button>
                </div>


                
            </div>
        </div> <!-- end Pills content -->
    </div>
</template>

<script>
import InterestSelectBox from "@/components/InterestSelectBox.vue";
export default {
    data: function () {
        return{
            setInterestCode: false,
            
            userEmail: null,
            userName: null,
            password1: null,
            password2: null,
            gradeCode: null
        }
    },
    components: {
        InterestSelectBox
    },
    methods: {
        async handleRegister() {
            // 사용자 입력 체크
            // if(this.password1 != this.password2){
            //     alert('비밀번호가 다름')
            // }
            try{
                this.$store.commit('SET_USE_INTEREST_CODE', this.setInterestCode);
                console.log(this.$store.state.address.setInterestCode)
                const user = {
                    userEmail: this.userEmail,
                    userPassword: this.password1,
                    userName: this.userName,
                    gradeCode: this.gradeCode
                }
                console.log('register ' + user)
                await this.$store.dispatch('register', user);
                alert('회원가입 성공')
            } catch(error){
                alert('회원가입 실패')
            }
            
        },


    // async confirm() {
    //     const user = {
    //         userEmail: this.userEmail,
    //         userPassword: this.userPassword
    //     }
    //   await this.$store.dispatch('login',user);

    //   let token = this.$store.state.user.token
    //   console.log("1. login token >> " + token);
    //   console.log("login? "+this.$store.state.user.isLogin)
    //   if (this.$store.state.user.isLogin) {
    //     await this.$store.dispatch('getUserInfo', token);
    //     console.log("4. confirm() userInfo :: ", this.$store.state.user.userInfo);
    //     this.$router.replace("/");
    //   }
    // },
    },
}
</script>

<style scoped>
.tab-pane >>> .btn-block {
    display: block;
    width: 100%;
}
.radio-wrapper >>> input{
  margin: 4px;
  width: 20px;
  height: 20px;
  padding-right: 10px;

}
</style>