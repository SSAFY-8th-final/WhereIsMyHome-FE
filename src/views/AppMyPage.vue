<template>
        <div class="container">
            <div class="pb-5 pt-5 mb-3" ></div>

            <!-- Email input -->
            <div class="form-outline mb-4">
                <input type="email" id="registerEmail" class="form-control" readonly/>
                <label class="form-label" for="registerEmail">Email</label>
            </div>

            <!-- Username input -->
            <div class="form-outline mb-4">
                <input type="text" id="registerUsername" class="form-control" />
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
                <input class="form-check-input me-2" type="checkbox" value="" id="interestCheck" v-model="setInterestArea"/>
                <label class="form-check-label" for="interestCheck">
                    관심지역 설정
                </label>
                
            </div>
            <div v-show="setInterestArea">
                다대포~~~~
                <interest-select-box></interest-select-box>
            </div>

            <!-- Submit button -->
            <button class="btn btn-primary btn-block mb-3">Sign in</button>

        </div>
</template>

<script>
import InterestSelectBox from "@/components/login/InterestSelectBox.vue";
export default {
    data: function () {
        return{
            setInterestArea: false
        }
    },
    components: {
        InterestSelectBox,
    }
}
</script>

<style>

</style>