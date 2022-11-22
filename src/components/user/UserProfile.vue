<template>
    <div id="team" class="team">
        <div class="row profile-area">
          <div class="col-lg-4 col-md-6 member" data-aos="fade-up" data-aos-delay="100">
            <div class="member-img">
              <img src="assets/img/team/team-1.jpg" class="img-fluid" alt="">
              <div class="social">
                <a href="#"><i class="fa-solid fa-gear"></i></a>
              </div>
            </div>
          </div><!-- End Team Member -->
            <div class="col-lg-4 col-md-6 user-info">
              <h4>{{this.$store.state.user.userInfo.userName}}</h4>
              <span>{{this.$store.state.user.userInfo.userEmail}}</span>
            </div>
  </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.team >>> .profile-area{
    box-shadow: 0 0 25px rgb(0 0 0 / 8%);
    padding: 20px 0 20px 0;
}
.team >>> .profile-area > .member{
    margin-top: 10px;
}
.team >>> .user-info{
    margin: 3em 0;
}
</style>