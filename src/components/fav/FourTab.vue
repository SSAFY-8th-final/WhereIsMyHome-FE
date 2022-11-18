<template>
  <!-- ======= Features Section ======= -->
  <section id="features" class="features">
    <div class="container" data-aos="fade-up">
      <ul class="nav nav-tabs row g-2 d-flex">
        <li class="nav-item col-6">
          <a class="nav-link active show" data-bs-toggle="tab" data-bs-target="#tab-1">
            <h4>최근 본 매물</h4>
          </a>
        </li>
        <!-- End tab nav item -->

        <li class="nav-item col-6">
          <a class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-2"> <h4>찜한 매물</h4> </a
          ><!-- End tab nav item -->
        </li>
      </ul>

      <div class="tab-content">
        <div class="tab-pane active show" id="tab-1">
          <pre-view></pre-view>
        </div>
        <!-- End tab content item -->

        <div class="tab-pane" id="tab-2">
          <pre-view></pre-view>
        </div>
        <!-- End tab content item -->
      </div>
    </div>
  </section>
  <!-- End Features Section -->
</template>

<script>
import PreView from "@/components/PreView.vue";


export default {
  components: {
    PreView,
  },
};
</script>

<style>

</style>