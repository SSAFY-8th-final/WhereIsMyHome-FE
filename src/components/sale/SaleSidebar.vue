<template>
  <div class="sidebar">
        <div class="sidebar-item categories">
            <h3 class="sidebar-title">{{ saleTypeStr }} {{this.$store.state.sale.saleAmount}}</h3>
            <h4 class="sidebar-subtitle">{{this.$store.state.sale.AptName}}</h4>
            <ul class="mt-3">
                <li><i class="fa-solid fa-chart-area"></i><strong>&nbsp;전용면적</strong></li>
                <li><i class="bi bi-cash-stack"></i><strong>&nbsp;관리비</strong></li>
                <li><i class="bi bi-building"></i><strong>&nbsp;층수</strong></li>
                <li><i class="bi bi-compass"></i><strong>&nbsp;방향</strong></li>
            </ul>
        </div><!-- End sidebar categories-->
    </div><!-- End Blog Sidebar -->
</template>

<script>
export default {
    computed: {
        saleTypeStr() {
            let saleType = this.$store.state.sale.saleTypeCode;
            if (saleType == '001') return '전세'
            else if (saleType == '002') return '월세'
            else return '매매'
        }
    }
}
</script>

<style scoped>
.sidebar-item {
    margin: 10px 0px;
}
.sidebar-title, .sidebar-subtitle {
    margin-bottom: 10px;
}
ul {
    background-color: rgb(238, 238, 238);
    margin-top: 10px;
    padding: 10px !important;
}
i {
    font-size: 20px;
}
</style>