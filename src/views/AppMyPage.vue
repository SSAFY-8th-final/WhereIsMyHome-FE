<template>
    <div>
    <bread-crumbs title="내 정보 수정"></bread-crumbs>
    <section class="container-sm pd-4">
    <div class="bg-white border mx-auto" style="width: 100%;">
        <section class="w-100 p-4 d-flex justify-content-center pb-4">
        <div style="width: 26rem;">
            <div class="container">

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
                    <interest-select-box></interest-select-box>
                </div>

                <!-- Submit button -->
                <button class="btn btn-primary btn-block mb-3">Sign in</button>

            </div>
        </div>
        </section>
    </div>
    </section>
</div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import InterestSelectBox from "@/components/login/InterestSelectBox.vue";

export default {
    data: function () {
        return{
            setInterestArea: false
        }
    },
    components: {
        InterestSelectBox, BreadCrumbs
    }
}
</script>

<style>

</style>