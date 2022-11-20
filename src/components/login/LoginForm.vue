<template>
    <div id="formItem">
        <!-- Pills navs -->
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link " id="tab-login" :class="{'active': this.loginTab}" @click="tabControll" 
                >Login</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link " id="tab-register" :class="{'active': !this.loginTab}" @click="tabControll" 
                >Register</a>
            </li>
        </ul> <!-- end Pills navs -->

        <!-- Pills content -->
        <div class="tab-content">
            <div class="tab-pane fade" role="tabpanel" aria-labelledby="tab-login" :class="[{'show': this.loginTab}, {'active': this.loginTab}]" >
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" id="loginName" class="form-control" />
                    <label class="form-label" for="loginName">Email or username</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" id="loginPassword" class="form-control" />
                    <label class="form-label" for="loginPassword">Password</label>
                </div>

                <!-- 2 column grid layout -->
                <div class="row mb-4">
                    <div class="col-md-6 d-flex justify-content-center">
                    <!-- Checkbox -->
                    <div class="form-check mb-3 mb-md-0">
                        <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                        <label class="form-check-label" for="loginCheck"> Remember me </label>
                    </div>
                    </div>

                    <div class="col-md-6 d-flex justify-content-center">
                    <!-- Simple link -->
                    <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <!-- Submit button -->
                <button class="btn btn-primary btn-block mb-4">Sign in</button>

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

                <!-- Register buttons -->
                <div class="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                </div>
                
            </div>
            <div class="tab-pane fade" role="tabpanel" aria-labelledby="tab-register" :class="[{'show': !this.loginTab}, {'active': !this.loginTab}]">

                <!-- Username input -->
                <div class="form-outline mb-4">
                    <input type="text" id="registerUsername" class="form-control" />
                    <label class="form-label" for="registerUsername">Username</label>
                </div>

                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" id="registerEmail" class="form-control" />
                    <label class="form-label" for="registerEmail">Email</label>
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
                    <input class="form-check-input me-2" type="checkbox" value="" id="interestCheck" v-model="setInterestCode"/>
                    <label class="form-check-label" for="interestCheck">
                        관심지역 설정
                    </label>
                    
                </div>
                <div v-show="setInterestCode">
                    <interest-select-box></interest-select-box>
                </div>

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

                <!-- Checkbox -->
                <div class="form-check d-flex justify-content-center mb-4">
                    <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                    aria-describedby="registerCheckHelpText" />
                    <label class="form-check-label" for="registerCheck">
                    I have read and agree to the terms
                    </label>
                </div>

                <!-- Submit button -->
                <button @click="handleRegister" class="btn btn-primary btn-block mb-3">Sign in</button>
                
            </div>
        </div> <!-- end Pills content -->
    </div>
</template>

<script>
import InterestSelectBox from "@/components/login/InterestSelectBox.vue";
export default {
    data: function () {
        return{
            loginTab: true,
            setInterestCode: false
        }
    },
    components: {
        InterestSelectBox
    },
    methods: {
        tabControll: function () {
            this.loginTab = !this.loginTab
        },
        handleRegister() {
             this.$store.commit('SET_INTEREST_CODE', this.setInterestCode);
             console.log(this.$store.state.address.setInterestCode)
        }
    },
}
</script>

<style scoped>
.tab-pane >>> .btn-block {
    display: block;
    width: 100%;
}
</style>