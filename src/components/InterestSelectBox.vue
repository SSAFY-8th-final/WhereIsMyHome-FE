<template>
    <div class="row" id="deal-header"> 
        <div class="col-4">
            <select v-model="sidoSelect" @change="setSidoSelect" class="form-select form-select-sm">
                <option v-for="(data, index) in this.$store.state.address.sidoList" :key="index" :value="data.code" >{{data.name}}</option>
            </select>
        </div>
        <div class="col-4">
            <select v-model="sigunguSelect" class="form-select form-select-sm" @change="setSigunguSelect">
                <option :value="null" >----</option>
                <option v-for="(data, index) in this.$store.getters.getFilteredSigungu" :key="index" :value="data.code" >{{data.name}}</option>
            </select>
        </div>
        <div class="col-4">
            <select v-model="dongSelect" @change="setDongSelect" class="form-select form-select-sm">
                <option :value="null">----</option>
                <option v-for="(data, index) in this.$store.getters.getFilteredDong" :key="index" :value="data.code" >{{data.name}}</option>
            </select>
        </div>
    </div>

</template>

<script>
export default {
    data: function () {
        return{
            sidoSelect: null,
            sigunguSelect: null,
            dongSelect: null,
        }
    },
    methods: {
        setSidoSelect: function(){
            this.sigunguSelect = null
            this.dongSelect = null
            this.$store.commit('SET_SIDO_SELECT', this.sidoSelect);
        },
        setSigunguSelect: function(){
            this.dongSelect = null
            this.$store.commit('SET_SIGUNGU_SELECT', this.sigunguSelect);
        },
        setDongSelect: function(){
            this.$store.commit('SET_DONG_SELECT', this.dongSelect);
        },
    },
    created(){
        
        this.sidoSelect = this.$store.state.address.sidoSelect;
        this.sigunguSelect = this.$store.state.address.sigunguSelect;
        this.dongSelect = this.$store.state.address.dongSelect;
    }

}
</script>

<style>

</style>