<template>
      <!-- ======= Breadcrumbs ======= -->
    <div class="breadcrumbs d-flex align-items-center" style="background-image: url('assets/img/interior-2.jpg');">
      <div class="container position-relative d-flex flex-column align-items-center" data-aos="fade">

        <h2>{{title}}</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>{{title}}</li>
        </ol>

      </div>
    </div><!-- End Breadcrumbs -->
</template>

<script>
export default {
  props: {
    title: String,
  }
}
</script>

<style>

</style>