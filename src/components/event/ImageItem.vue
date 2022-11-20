<template>
    <div class="col-lg-4 col-md-6 portfolio-item" :class="event.filter">
        <div class="portfolio-content h-100">
            <img src="assets/img/blog/blog-6.jpg" class="img-fluid" alt="" />
            <div class="portfolio-info">
            <h4>{{ getStatus }}</h4>
            <p>{{ event.name }}</p>
            <a
                href="assets/img/blog/blog-6.jpg"
                title="Remodeling 1"
                data-gallery="portfolio-gallery-remodeling"
                class="glightbox preview-link"
                ><i class="bi bi-zoom-in"></i
            ></a>
            <a @click="eventDetail" title="More Details" class="details-link"
                ><i class="bi bi-link-45deg"></i
            ></a>
            </div>
        </div>
    </div>
    <!-- End Projects Item -->
</template>

<script>
export default {
    props: ["event"],
    computed: {
        getStatus() {
            if (this.event.statusCode == '001')
                return '진행중';
            else if (this.event.statusCode == '002')
                return '예정';
            else
                return '종료';
        }
    },
    methods: {
        eventDetail() {
            this.$router.push('/event/' + this.event.eventKey);
        }
    }
}
</script>

<style>

</style>