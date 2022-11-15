<template>
  <!-- ======= toptier Section ======= -->
  <section id="toptier" class="toptier">
    <div class="container" data-aos="fade-up">
      <div class="slides-3 swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="toptier-item">
              <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div>
              <p>
                Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
                rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                risus at semper.
              </p>
              <div class="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-1.jpg" class="toptier-img" alt="" />
                <h3>Saul Goodman</h3>
                <h4>Ceo &amp; Founder</h4>
              </div>
            </div>
          </div>
          <!-- End testimonial item -->

          <div class="swiper-slide">
            <div class="toptier-item">
              <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div>
              <p>
                Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid
                cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet
                legam anim culpa.
              </p>
              <div class="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-2.jpg" class="toptier-img" alt="" />
                <h3>Sara Wilsson</h3>
                <h4>Designer</h4>
              </div>
            </div>
          </div>
          <!-- End testimonial item -->

          <div class="swiper-slide">
            <div class="toptier-item">
              <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div>
              <p>
                Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem
                veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint
                minim.
              </p>
              <div class="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-3.jpg" class="toptier-img" alt="" />
                <h3>Jena Karlis</h3>
                <h4>Store Owner</h4>
              </div>
            </div>
          </div>
          <!-- End testimonial item -->

          <div class="swiper-slide">
            <div class="toptier-item">
              <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div>
              <p>
                Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim
                fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem
                dolore labore illum veniam.
              </p>
              <div class="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-4.jpg" class="toptier-img" alt="" />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
              </div>
            </div>
          </div>
          <!-- End testimonial item -->

          <div class="swiper-slide">
            <div class="toptier-item">
              <div class="stars">
                <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
                ><i class="bi bi-star-fill"></i>
              </div>
              <p>
                Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster
                veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam
                culpa fore nisi cillum quid.
              </p>
              <div class="profile mt-auto">
                <img src="assets/img/testimonials/testimonials-5.jpg" class="toptier-img" alt="" />
                <h3>John Larson</h3>
                <h4>Entrepreneur</h4>
              </div>
            </div>
          </div>
          <!-- End testimonial item -->
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </section>
  <!-- End Testimonials Section -->
</template>

<script>
export default {};
</script>

<style>
/*--------------------------------------------------------------
# Testimonials Section
--------------------------------------------------------------*/

.toptier .toptier-item {
  box-sizing: content-box;
  padding: 30px;
  margin: 40px 30px;
  background: var(--color-secondary);
  height: 60%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  text-align: center;
  transition: 0.3s;
}

.toptier .toptier-item .stars {
  margin-bottom: 15px;
}

.toptier .toptier-item .stars i {
  color: #ffc107;
  margin: 0 1px;
}

.toptier .toptier-item .toptier-img {
  width: 90px;
  border-radius: 50%;
  border: 5px solid #474a4d;
  margin: 0 auto;
}

.toptier .toptier-item h3 {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px 0;
  color: #fff;
}

.toptier .toptier-item h4 {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.toptier .toptier-item p {
  font-style: italic;
  margin: 0 auto 15px auto;
}

.toptier .swiper-pagination {
  margin-top: 20px;
  position: relative;
}

.toptier .swiper-pagination .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.toptier .swiper-pagination .swiper-pagination-bullet-active {
  background-color: rgba(255, 255, 255, 0.5);
}

.toptier .swiper-slide {
  opacity: 0.3;
}

@media (max-width: 1199px) {
  .toptier .swiper-slide-active {
    opacity: 1;
  }

  .toptier .swiper-pagination {
    margin-top: 0;
  }

  .toptier .testimonial-item {
    margin: 40px 20px;
  }
}

@media (min-width: 1200px) {
  .toptier .swiper-slide-next {
    opacity: 1;
    transform: scale(1.12);
  }
}
</style>
