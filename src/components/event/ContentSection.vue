<template>
    <section id="project-details" class="project-details">
        <div class="container" data-aos="fade-up" data-aos-delay="100">
            <div class="row justify-content-between gy-4 mt-4">
                    <div class="col-lg-8">
                        <div class="portfolio-description">
                            <event-img-slide></event-img-slide>
                            <div id="content">
                                <h2>This is a title of event detail</h2>
                                <p>
                                Autem ipsum nam porro corporis rerum. Quis eos dolorem eos itaque inventore commodi labore quia quia. Exercitationem repudiandae officiis neque suscipit non officia eaque itaque enim. Voluptatem officia accusantium nesciunt est omnis tempora consectetur dignissimos. Sequi nulla at esse enim cum deserunt eius.
                                </p>
                                <p>
                                Amet consequatur qui dolore veniam voluptatem voluptatem sit. Non aspernatur atque natus ut cum nam et. Praesentium error dolores rerum minus sequi quia veritatis eum. Eos et doloribus doloremque nesciunt molestiae laboriosam.
                                </p>
    
                                <testimonial-item></testimonial-item>
    
                                <p>
                                Impedit ipsum quae et aliquid doloribus et voluptatem quasi. Perspiciatis occaecati earum et magnam animi. Quibusdam non qui ea vitae suscipit vitae sunt. Repudiandae incidunt cumque minus deserunt assumenda tempore. Delectus voluptas necessitatibus est.
                                </p>
                                <p>
                                Sunt voluptatum sapiente facilis quo odio aut ipsum repellat debitis. Molestiae et autem libero. Explicabo et quod necessitatibus similique quis dolor eum. Numquam eaque praesentium rem et qui nesciunt.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3">
                        <side-summary></side-summary>
                    </div>
            </div>
        </div>
    </section>
</template>

<script>
import EventImgSlide from "@/components/event/EventImgSlide.vue";
import TestimonialItem from "@/components/event/TestimonialItem.vue";
import SideSummary from "@/components/event/SideSummary.vue";
export default {
    components: {
        EventImgSlide,
        TestimonialItem,
        SideSummary
    }
}
</script>

<style scoped>
#content {
    margin-top: 40px;
}
</style>