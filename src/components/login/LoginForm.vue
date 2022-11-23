<template>
    <div id="formItem">
        <!-- Pills content -->
        <div >
            <div >
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input v-model="userEmail" type="email" id="loginName" class="form-control" />
                    <label class="form-label" for="loginName">Email or username</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input v-model="userPassword" type="password" id="loginPassword" class="form-control" />
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
                <button @click="confirm" class="btn btn-primary btn-block mb-4">Sign in</button>

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
            
        </div> <!-- end Pills content -->
    </div>
</template>

<script>
export default {
    data: function () {
        return{
            loginTab: true,
            setInterestCode: false,
            
            userEmail: null,
            userPassword: null
        }
    },
    methods: {
    async confirm() {
        const user = {
            userEmail: this.userEmail,
            userPassword: this.userPassword
        }
      await this.$store.dispatch('login',user);

      let token = this.$store.state.user.token
      console.log("1. login token >> " + token);
      console.log("login? "+this.$store.state.user.isLogin)
      if (this.$store.state.user.isLogin) {
        await this.$store.dispatch('getUserInfo', token);
        console.log("4. confirm() userInfo :: ", this.$store.state.user.userInfo);
        this.$router.replace("/");
      }
    },
    },
}
</script>

<style scoped>
.tab-pane >>> .btn-block {
    display: block;
    width: 100%;
}
</style>