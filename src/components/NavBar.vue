<template>
  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center">
    <div
      class="
        container-fluid container-xl
        d-flex
        align-items-center
        justify-content-between
      "
    >
      <a href="/" class="logo d-flex align-items-center">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>Where Is My Home<span>.</span></h1>
      </a>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li class="dropdown" v-show="isAdmin">
            <a href="#"
              ><span>Admin</span>
              <i class="bi bi-chevron-down dropdown-indicator"></i
            ></a>
            <ul>
              <li><router-link to="/admin/event">이벤트 관리</router-link></li>
              <li>
                <router-link to="/admin/notice">공지사항 관리</router-link>
              </li>
              <li><router-link to="/admin/user">사용자 관리</router-link></li>
            </ul>
          </li>
          <li><router-link to="/map">Map</router-link></li>
          <li><router-link to="/fav">Fav</router-link></li>
          <li><router-link to="/event">Event</router-link></li>
          <li><router-link to="/notice">Notice</router-link></li>
          <li class="dropdown nav-icon-dropdown">
            <a href="#"
              ><div class="nav-icon">
                <i class="fa-regular fa-face-smile fa-2x"></i></div
            ></a>
            <ul>
              <li v-show="login"><router-link to="/user">My Page</router-link></li>
              <li v-show="login"><a @click="logoutHandle">LogOut</a></li>
              <li v-show="!login"><router-link to="/login">Login</router-link></li>
              <li v-show="!login"><router-link to="/register">Register</router-link></li>
            </ul>
          </li>
          <li class="dropdown" v-show="isDealer"> 
            <a href="#"
              ><span>Sale</span>
              <i class="bi bi-chevron-down dropdown-indicator"></i
            ></a>
            <ul>
              <li><router-link to="/sale/insert">매물 등록</router-link></li>
              <li><router-link to="/sale">등록한 매물 보기</router-link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
  <!-- End Header -->
</template>

<script>
export default {
  data: function () {
        return{
        }
    },
  methods: {
    async logoutHandle() {
      await this.$store.dispatch("logout");
      alert("logout 성공");
      this.$router.go();
    },
  },
  computed: {
    isAdmin() {
      if (!this.login) return false;
      else if (this.$store.state.user.userInfo.gradeCode == '000') return true;
      return false;
    },
    isDealer() {
      if (!this.login) return false;
      else if (this.$store.state.user.userInfo.gradeCode == '001') return true;
      return false;
    },
    login(){
      return this.$store.state.user.isLogin
    }
  },
};
</script>

<style scoped>
.navbar >>> .nav-icon i {
  font-size: 1.5em;
}

.navbar >>> .nav-icon-dropdown {
  padding-top: 15px;
}
</style>
