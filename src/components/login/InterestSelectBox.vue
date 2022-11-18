<template>
    <div class="row" id="deal-header"> 
        <div class="col-4">
            <select v-model="sidoSelect" @change="setSidoSelect" class="form-select form-select-sm">
                <option v-for="(data, index) in this.$store.state.address.sido" :key="index" :value="data.code" >{{data.name}}</option>
            </select>
        </div>
        <div class="col-4">
            <select v-show="sidoSelect != ''" v-model="sigunguSelect" class="form-select form-select-sm" @change="setSigunguSelect">
                <option v-for="(data, index) in this.$store.getters.getFilteredSigungu" :key="index" :value="data.code" >{{data.name}}</option>
            </select>
            <select v-show="sidoSelect == ''" v-model="sigunguSelect" class="form-select form-select-sm" disabled>
                <option value="">----</option>
            </select>
        </div>
        <div class="col-4">
            <select v-show="sigunguSelect != ''" v-model="dongSelect" @change="setDongSelect" class="form-select form-select-sm">
                <option v-for="(data, index) in this.$store.getters.getFilteredDong" :key="index" :value="data.code" >{{data.name}}</option>
            </select>
            <select v-show="sigunguSelect == ''" v-model="dongSelect" class="form-select form-select-sm" disabled>
                <option value="">----</option>
            </select>
        </div>
    </div>

</template>

<script>
export default {
    data: function () {
        return{
            sidoSelect: '',
            sigunguSelect: '',
            dongSelect: '',

            sido: [],
        }
    },
    methods: {
        setSidoSelect: function(){
            this.$store.commit('SET_SIDO_SELECT', this.sidoSelect);
        },
        setSigunguSelect: function(){
            this.$store.commit('SET_SIGUNGU_SELECT', this.sigunguSelect);
        },
        setDongSelect: function(){
            this.$store.commit('SET_DONG_SELECT', this.dongSelect);
        },
    }

}
</script>

<style>

</style>