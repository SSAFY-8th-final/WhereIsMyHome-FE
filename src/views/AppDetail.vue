<template>
    <div>
        <bread-crumbs title="매물"></bread-crumbs>
        <section id="blog" class="blog">
            <div class="container" data-aos="fade-up" data-aos-delay="100">
                <div class="row g-5">
                    <div class="col-lg-8">
                        <sale-post></sale-post>
                    </div>

                    <div class="col-lg-4">
                        <sale-sidebar></sale-sidebar>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import http from "@/common/axios.js";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import SalePost from "@/components/sale/SalePost.vue";
import SaleSidebar from "@/components/sale/SaleSidebar.vue";

export default {
    components: { BreadCrumbs, SalePost, SaleSidebar },
    methods: {
        async saleDetail() {
            try {
                let { data } = await http.get('/sales/' + this.$route.params.id);
                console.log(data.dto);

                if (data.result == "login") {
                    this.doLogout(); // this.$router.push("/login"); 에서 변경
                } else {
                    let { dto } = data;
                    this.$store.commit("SET_SALE_DETAIL", dto);
                }
            } catch (error) {
                console.log("AdminEventVue: error : ");
                console.log(error);
            }
        },
    },
    created() {
        this.saleDetail();

        let arr = localStorage.getItem('watched');
        if (arr == null) { // 초기 입력
            arr = [];
        } else {
            arr = JSON.parse(arr);
        }

        arr.unshift(this.$route.params.id);
        arr = new Set(arr);
        arr = [...arr];
        console.log(arr);

        localStorage.setItem('watched', JSON.stringify(arr));
    }
}
</script>

<style scoped>
.row {
    --bs-gutter-x: 3rem;
}
.row.g-5 {
    padding-right: calc(var(--bs-gutter-x) * .5) !important;
    padding-left: calc(var(--bs-gutter-x) * .5) !important;
}
</style>